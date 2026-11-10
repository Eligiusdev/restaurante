// Capa de datos (repositorio). Reemplazable por Supabase + Realtime.
import {CATALOGO,LEGACY_IMAGE_FILES,buildImagePrompt,imageSlug} from './catalog.js';
const KEY='mesaservida.v1',MIN=60000,bus=new EventTarget();
export const CATS={Entradas:'ENT','Platos Principales':'PRIN',Pastas:'PAS',Hamburguesas:'HAMB',Bebidas:'BEB',Postres:'POST'};
export const IMAGE_CATEGORIES={Entradas:'entradas','Platos Principales':'principales',Pastas:'pastas',Hamburguesas:'hamburguesas',Bebidas:'bebidas',Postres:'postres'};
export const SECCIONES=[
 {id:'terraza',ubicacion:'Terraza',descripcion:'Aire libre y ambiente relajado.',consumo_minimo:0},
 {id:'salon',ubicacion:'Salón principal',descripcion:'Comedor principal con servicio de mesa.',consumo_minimo:0},
 {id:'barra',ubicacion:'Barra',descripcion:'Un lugar cercano a la cocina y coctelería.',consumo_minimo:0},
 {id:'ejecutivo',ubicacion:'Salón Ejecutivo · Gran Vista',descripcion:'Vista panorámica, servicio premium y consumo mínimo por mesa.',consumo_minimo:180000}
];
const CAPACIDADES=[2,2,4,4,4,6,6,2,4,4,6,8,2,4,6];
export const on=(t,f)=>bus.addEventListener(t,e=>f(e.detail));
export const emit=(t,d)=>bus.dispatchEvent(new CustomEvent(t,{detail:d}));
export const toast=(msg,tipo='ok')=>emit('toast',{msg,tipo});
export const uid=p=>p+Math.random().toString(36).slice(2,9);
export const cop=n=>'$'+Number(n).toLocaleString('es-CO')+' COP';
export const hora=t=>new Date(t).toLocaleString('es-CO',{timeZone:'America/Bogota',dateStyle:'short',timeStyle:'medium'});
let S;
export const db=()=>S;
export const now=()=>Date.now()+(S?.session?.rol==='admin'?Number(S.config.offset)||0:0);
const save=()=>localStorage.setItem(KEY,JSON.stringify(S));
export const commit=()=>{save();emit('change')};
const normalizarCorreo=correo=>String(correo||'').replace(/\s/g,'').toLowerCase();
const normalizarDocumento=documento=>String(documento||'').replace(/[.\s-]/g,'');
const normalizarTelefono=telefono=>String(telefono||'').replace(/[\s-]/g,'');
const hex=bytes=>Array.from(new Uint8Array(bytes),b=>b.toString(16).padStart(2,'0')).join('');
async function hashPassword(password,salt){
 if(!globalThis.crypto?.subtle)throw new Error('Este navegador no permite credenciales locales seguras; abre la app desde localhost.');
 const encodedSalt=salt||hex(crypto.getRandomValues(new Uint8Array(16))),key=await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
 const derived=await crypto.subtle.deriveBits({name:'PBKDF2',salt:Uint8Array.from(encodedSalt.match(/.{2}/g),b=>parseInt(b,16)),iterations:120000,hash:'SHA-256'},key,256);
 return{salt:encodedSalt,hash:hex(derived)}
}
export const currentSession=()=>S?.session||null;
export const clientMatch=(correo,documento)=>{const email=normalizarCorreo(correo),doc=normalizarDocumento(documento);return S?.clientes?.find(c=>(email&&normalizarCorreo(c.correo)===email)||(doc&&normalizarDocumento(c.documento)===doc))||null};
const validarPerfilCliente=({nombre,correo,documento,telefono})=>{
 const name=String(nombre||'').trim(),email=normalizarCorreo(correo),doc=normalizarDocumento(documento),phone=normalizarTelefono(telefono);
 if(name.length<3)throw new Error('Escribe tu nombre completo.');
 if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))throw new Error('Escribe un correo válido.');
 if(!/^\d{6,10}$/.test(doc))throw new Error('La cédula debe tener entre 6 y 10 dígitos.');
 if(!/^3\d{9}$/.test(phone))throw new Error('El teléfono debe tener 10 dígitos e iniciar en 3.');
 return{nombre:name,correo:email,documento:doc,telefono:phone}
};
export async function registerClient({nombre,correo,documento,telefono,password}){
 const profile=validarPerfilCliente({nombre,correo,documento,telefono}),email=profile.correo;
 if(String(password||'').length<8)throw new Error('La contraseña debe tener al menos 8 caracteres.');
 if(S.users.some(user=>normalizarCorreo(user.correo)===email))throw new Error('Ya existe una cuenta con ese correo.');
 const matched=clientMatch(email,profile.documento);
 if(matched&&(normalizarCorreo(matched.correo)!==email||normalizarDocumento(matched.documento)!==profile.documento))throw new Error('Ese correo o cédula ya pertenece a otro perfil. Verifica los datos.');
 const credential=await hashPassword(password),user={id:matched?.id||uid('u'),...profile,rol:'cliente',...credential};
 if(matched)Object.assign(matched,profile);else S.clientes.push({id:user.id,...profile});
 S.users.push(user);S.session={id:user.id,...profile,rol:user.rol};S.rol='cliente';S.config.offset=0;commit();return S.session
}
export function completeClientProfile(profile){
 const session=currentSession();if(!session||session.rol!=='cliente')throw new Error('Inicia sesión como cliente para crear tu perfil.');
 const clean=validarPerfilCliente(profile),user=S.users.find(item=>item.id===session.id),matched=clientMatch(clean.correo,clean.documento);
 if(matched&&(normalizarCorreo(matched.correo)!==clean.correo||normalizarDocumento(matched.documento)!==clean.documento))throw new Error('Ese correo o cédula ya pertenece a otro cliente.');
 if(matched)Object.assign(matched,clean);else S.clientes.push({id:uid('c'),...clean});
 if(user)Object.assign(user,clean);
 S.session={...session,...clean};S.rol='cliente';commit();return S.session
}
export async function login({rol,correo,password}){
 const email=normalizarCorreo(correo);
 if(rol==='admin'){
  if(email!=='admin@restaurant.com'||password!=='admin123')throw new Error('Credenciales de administrador incorrectas.');
  S.session={id:'admin-demo',nombre:'Administrador',correo:email,rol:'admin'};S.rol='admin';commit();return S.session
 }
 const user=S.users.find(item=>normalizarCorreo(item.correo)===email);
 if(!user||user.rol!=='cliente')throw new Error('No encontramos una cuenta de cliente con ese correo.');
 const credential=await hashPassword(password,user.salt);
 if(credential.hash!==user.hash)throw new Error('Correo o contraseña incorrectos.');
 S.session={id:user.id,nombre:user.nombre,correo:user.correo,documento:user.documento||'',telefono:user.telefono||'',rol:user.rol};S.rol=user.rol;if(user.rol!=='admin')S.config.offset=0;commit();return S.session
}
export function logout(){S.session=null;S.rol='cliente';S.config.offset=0;commit()}
export function load(){
 try{S=JSON.parse(localStorage.getItem(KEY))}catch{S=null}
 if(!S||!S.mesas){S=seed();save();return}
 let changed=false;
 if(!Array.isArray(S.users)){S.users=[];changed=true}
 if(!Array.isArray(S.clientes)){S.clientes=[];changed=true}
 for(const user of S.users){const customer=clientMatch(user.correo,user.documento);if(customer){if(!user.documento){user.documento=customer.documento;changed=true}if(!user.telefono){user.telefono=customer.telefono;changed=true}}}
 if(S.session?.rol==='cliente'){
  const user=S.users.find(item=>item.id===S.session.id);
  if(user)for(const field of['nombre','correo','documento','telefono'])if(user[field]&&S.session[field]!==user[field]){S.session[field]=user[field];changed=true}
 }
 if(!S.session||!['admin','cliente'].includes(S.session.rol)){if(S.session){S.session=null;changed=true}S.rol='cliente'}else S.rol=S.session.rol;
 if(S.config&&S.session?.rol!=='admin'&&Number(S.config.offset)!==0){S.config.offset=0;changed=true}
 const expansions=[
    ['Jugo natural',p=>p.categoria==='Bebidas'&&p.nombre.startsWith('Jugo natural')],
  ['Jugo de mango y maracuyá',p=>p.categoria==='Bebidas'&&p.nombre.startsWith('Jugo natural')],
    ['Cerveza artesanal',p=>p.nombre.startsWith('Cerveza artesanal')],
  ['Cerveza artesanal dorada',p=>p.nombre.startsWith('Cerveza artesanal')]
 ];
 for(const[legacyName,isVariant]of expansions){
  const legacy=S.productos.find(p=>p.nombre===legacyName);
  if(!legacy)continue;
  S.productos=S.productos.filter(p=>p.nombre!==legacyName);
  for(const item of CATALOGO.filter(isVariant))if(!S.productos.some(p=>p.nombre===item.nombre))S.productos.push({...item,id:uid('pr'),disponible:legacy.disponible});
  changed=true;
 }
 const renamedProducts={'Hamburguesa Cyber Trufa':'Hamburguesa de trufa','Mocktail neón cítrico':'Mocktail cítrico de la casa'};
 for(const product of S.productos||[])if(renamedProducts[product.nombre]){product.nombre=renamedProducts[product.nombre];changed=true}
 for(const p of S.productos||[]){
  if(p.categoria==='Platos principales'){p.categoria='Platos Principales';changed=true}
  const dir=IMAGE_CATEGORIES[p.categoria]||'entradas',item=CATALOGO.find(x=>x.nombre===p.nombre),legacyImage=LEGACY_IMAGE_FILES[p.nombre];
  if(p.imagen){delete p.imagen;changed=true}
  const imageUrl=item?.imagen_url|| (legacyImage?`assets/images/dishes/${dir}/${legacyImage}`:null);
  if(imageUrl&&p.imagen_url!==imageUrl){p.imagen_url=imageUrl;changed=true}else if(!p.imagen_url){p.imagen_url=`assets/images/dishes/${dir}/${imageSlug(p.nombre)}.webp`;changed=true}
  if(item?.imagen_fallback&&p.imagen_fallback!==item.imagen_fallback){p.imagen_fallback=item.imagen_fallback;changed=true}
  if(!p.imagen_prompt){p.imagen_prompt=item?.imagen_prompt||buildImagePrompt(p.nombre,p.categoria);changed=true}
  if(!p.tipo&&item?.tipo){p.tipo=item.tipo;changed=true}
  for(const field of['tiempo_preparacion','porcion','alergenos'])if(item?.[field]!==undefined&&p[field]===undefined){p[field]=item[field];changed=true}
 }
 for(const p of S.pagos||[])if(!Object.hasOwn(p,'metodo')){p.metodo='No especificado';changed=true}
 if(!S.config)S.config={offset:0};
 if(!S.config.duracion_minutos){S.config.duracion_minutos=120;changed=true}
 for(const r of S.reservas||[]){
  if(!r.fecha_reserva&&['pendiente_pago','confirmada','en_curso'].includes(r.estado)){r.fecha_reserva=r.fecha_creacion;changed=true}
  if(r.fecha_reserva&&!r.fecha_fin){r.fecha_fin=r.fecha_reserva+120*MIN;changed=true}
  if(r.estado==='pendiente_pago'&&!r.fecha_pago_vencimiento){r.fecha_pago_vencimiento=r.fecha_vencimiento;changed=true}
 }
 for(const m of S.mesas){
  if(m.estado==='reservada'){m.estado='disponible';changed=true}
  if(m.estado==='ocupada'){
   const tieneTurno=db().reservas.some(r=>r.mesa_id===m.id&&r.estado==='en_curso');
   if(tieneTurno){m.estado='disponible';delete m.ocupacion_manual;changed=true}
   else if(!m.ocupacion_manual){m.ocupacion_manual=true;changed=true}
  }
 }
 let nextNumber=Math.max(0,...S.mesas.map(m=>Number(m.numero)||0));
 for(const section of SECCIONES){
  const sectionTables=S.mesas.filter(m=>m.ubicacion===section.ubicacion);
  for(const table of sectionTables)if(table.consumo_minimo!==section.consumo_minimo){table.consumo_minimo=section.consumo_minimo;changed=true}
  while(sectionTables.length<15){
   nextNumber++;
   const id=`m${nextNumber}`;
   if(S.mesas.some(m=>m.id===id||m.numero===nextNumber))continue;
   S.mesas.push({id,numero:nextNumber,capacidad:CAPACIDADES[sectionTables.length%CAPACIDADES.length],estado:'disponible',ubicacion:section.ubicacion,consumo_minimo:section.consumo_minimo});
   sectionTables.push(S.mesas[S.mesas.length-1]);changed=true;
  }
 }
 if(changed)save()
}
export function reset(){if(currentSession()?.rol!=='admin')throw new Error('Solo un administrador puede restablecer los datos.');const session=currentSession();localStorage.removeItem(KEY);load();S.session=session;S.rol='admin';save();emit('change')}
function seed(){
 const t=Date.now(),mesas=SECCIONES.flatMap((section,sectionIndex)=>Array.from({length:15},(_,i)=>{const numero=sectionIndex*15+i+1;return{id:'m'+numero,numero,capacidad:CAPACIDADES[i%CAPACIDADES.length],estado:'disponible',ubicacion:section.ubicacion,consumo_minimo:section.consumo_minimo}}));
 const clientes=[['Camila Restrepo','1020304050','camila@correo.com','3101234567'],['Andrés Gómez','71234567','andres@correo.com','3209876543'],['Laura Posada','43987654','laura@correo.com','3005551234'],['Julián Ríos','1037654321','julian@correo.com','3117778899'],['Marta Cano','32456789','marta@correo.com','3151112233']].map((c,i)=>({id:'c'+(i+1),nombre:c[0],documento:c[1],correo:c[2],telefono:c[3]}));
 const reservas=[],pagos=[];let n=0;
 const add=(ci,mi,pers,estado,ago,left,pe)=>{n++;const id='r'+n,pid='p'+n,cr=t-ago*MIN;
  reservas.push({id,codigo_reserva:'MS-'+(1000+n),cliente_id:'c'+ci,mesa_id:'m'+mi,cantidad_personas:pers,fecha_reserva:cr,fecha_fin:cr+120*MIN,fecha_creacion:cr,fecha_vencimiento:left==null?cr+30*MIN:t+left*MIN,estado,pago_id:pid});
  pagos.push({id:pid,reserva_id:id,monto:50000,moneda:'COP',estado:pe,metodo:'PSE',fecha_pago:cr,referencia:'SIM-'+(7000+n)});
 };
 add(1,2,2,'confirmada',5,25,'aprobado');add(2,5,2,'confirmada',26,4,'aprobado');add(3,8,2,'confirmada',18,12,'aprobado');
 add(4,7,4,'en_curso',40,null,'aplicado');
 add(5,3,2,'finalizada',3000,null,'aplicado');add(5,6,4,'cancelada',2900,null,'reembolsado');add(1,8,4,'expirada',2800,null,'retenido');add(2,4,4,'finalizada',2000,null,'aplicado');
 const productos=CATALOGO.map(p=>({...p}));
 return{mesas,clientes,reservas,pagos,productos,users:[],session:null,config:{anticipo:50000,minutos:30,duracion_minutos:120,umbral:5,offset:0},rol:'cliente'};
}
