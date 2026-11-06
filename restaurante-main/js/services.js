// Capa de servicio: TODAS las reglas de negocio viven aquí.
import * as D from './store.js';
import {buildImagePrompt,imageCategoryPath,imageSlug} from './catalog.js';
const {db,now,toast,uid,commit}=D,MIN=60000,DURACION_TURNO=120*MIN;
export const ventana=()=>(Number(db().config.minutos)||30)*MIN;
export const ACTIVAS=['pendiente_pago','confirmada','en_curso'];
export const METODOS_PAGO=['PSE','Nequi / Daviplata','Tarjeta'];
const MENSAJE_MESA_NO_DISPONIBLE='No es posible reservar esta mesa porque actualmente no está disponible. Selecciona otra mesa';
const MENSAJE_RESERVA_ACTIVA='Ya tienes una reserva activa. Para realizar otra, primero debes cancelar o finalizar la reserva existente';
export const norm={correo:s=>String(s).replace(/\s/g,'').toLowerCase(),doc:s=>String(s).replace(/[.\s-]/g,''),tel:s=>String(s).replace(/[\s-]/g,'')};
export const esAdmin=()=>D.currentSession()?.rol==='admin';
export const mesa=id=>db().mesas.find(m=>m.id===id);
export const res=id=>db().reservas.find(r=>r.id===id);
export const pagoDe=id=>db().pagos.find(p=>p.id===id);
export const contacto=r=>db().clientes.find(c=>c.id===r.cliente_id)||r.datos;
export const clienteRegistrado=(correo,documento)=>db().clientes.some(c=>norm.correo(c.correo)===norm.correo(correo)&&norm.doc(c.documento)===norm.doc(documento));
export const finReserva=r=>Number(r.fecha_fin)||(Number(r.fecha_reserva||r.fecha_creacion)+DURACION_TURNO);
const inicioReserva=r=>Number(r.fecha_reserva)||Number(r.fecha_creacion);
const cruza=(inicio,fin,otroInicio,otroFin)=>inicio<otroFin&&otroInicio<fin;
export const intervaloLibre=(mesaId,inicio,fin,ignorarId=null)=>!db().reservas.some(r=>r.mesa_id===mesaId&&r.id!==ignorarId&&ACTIVAS.includes(r.estado)&&cruza(inicio,fin,inicioReserva(r),finReserva(r)));
export const reservaDeMesa=(id,inicio=now(),fin=inicio+1)=>db().reservas.find(r=>r.mesa_id===id&&ACTIVAS.includes(r.estado)&&cruza(inicio,fin,inicioReserva(r),finReserva(r)));
export const reservasDeMesa=id=>db().reservas.filter(r=>r.mesa_id===id&&ACTIVAS.includes(r.estado)).sort((a,b)=>inicioReserva(a)-inicioReserva(b));
export const mesaLibre=(m,inicio=now(),fin=inicio+DURACION_TURNO)=>!m.ocupacion_manual&&intervaloLibre(m.id,inicio,fin);
export const mesaLibreEn=(m,valor)=>{const inicio=fechaBogota(valor);return Number.isFinite(inicio)&&mesaLibre(m,inicio,inicio+DURACION_TURNO)};
export const estadoMesa=m=>{if(m.ocupacion_manual)return'ocupada';const r=reservaDeMesa(m.id);return r?.estado==='en_curso'?'ocupada':r?'reservada':'disponible'};
export const proximas=()=>db().reservas.filter(r=>r.estado==='confirmada'&&r.fecha_vencimiento>now()&&r.fecha_vencimiento-now()<db().config.umbral*MIN);
const fechaDia=t=>new Intl.DateTimeFormat('en-CA',{timeZone:'America/Bogota',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(t));
export const reservasHoy=()=>db().reservas.filter(r=>['pendiente_pago','confirmada','en_curso'].includes(r.estado)&&fechaDia(inicioReserva(r))===fechaDia(now())).sort((a,b)=>inicioReserva(a)-inicioReserva(b));
export const llegadasPendientes=()=>reservasHoy().filter(r=>r.estado==='confirmada'&&r.fecha_vencimiento>now());
export const proximasLiberar=()=>db().reservas.filter(r=>r.estado==='en_curso'||r.estado==='confirmada').map(r=>({...r,liberacion_estimada:r.estado==='confirmada'?Math.min(r.fecha_vencimiento,finReserva(r)):finReserva(r)})).filter(r=>r.liberacion_estimada>now()).sort((a,b)=>a.liberacion_estimada-b.liberacion_estimada);
export const ocupacionPorZona=()=>D.SECCIONES.map(s=>{const mesas=db().mesas.filter(m=>m.ubicacion===s.ubicacion),ocupadas=mesas.filter(m=>estadoMesa(m)!=='disponible').length;return{...s,total:mesas.length,ocupadas,porcentaje:mesas.length?Math.round(ocupadas/mesas.length*100):0}});
export const delSesion=()=>{const s=D.currentSession();return s?db().reservas.filter(r=>r.cliente_id===s.id||norm.correo(contacto(r)?.correo)===norm.correo(s.correo)).sort((a,b)=>b.fecha_creacion-a.fecha_creacion):[]};
export const TABS={activas:r=>ACTIVAS.includes(r.estado),vencidas:r=>r.estado==='expirada',canceladas:r=>r.estado==='cancelada',finalizadas:r=>r.estado==='finalizada',todas:()=>true};
const activaDe=(correo,doc)=>db().reservas.some(r=>{if(!ACTIVAS.includes(r.estado))return false;const c=contacto(r);return c&&(norm.correo(c.correo)===correo||norm.doc(c.documento)===doc)});
const fechaBogota=valor=>/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(valor)?Date.parse(`${valor}:00-05:00`):NaN;
export function validar(d){const e={},m=mesa(d.mesa_id),n=Number(d.personas);
 if(d.nombre.trim().length<5||d.nombre.trim().split(/\s+/).length<2)e.nombre='Ingresa nombre y apellido';
 if(!/^\d{6,10}$/.test(norm.doc(d.documento)))e.documento='Solo números, de 6 a 10 dígitos';
 if(!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/.test(norm.correo(d.correo)))e.correo='Correo con formato no válido';
 if(!/^3\d{9}$/.test(norm.tel(d.telefono)))e.telefono='Debe tener 10 dígitos e iniciar en 3';
 const fechaReserva=fechaBogota(d.fecha_reserva);
 if(!Number.isFinite(fechaReserva))e.fecha_reserva='Selecciona una fecha y hora válidas';else if(fechaReserva<=now())e.fecha_reserva='La fecha y hora deben ser futuras';else if(m&&!mesaLibre(m,fechaReserva,fechaReserva+DURACION_TURNO))e.mesa_id=MENSAJE_MESA_NO_DISPONIBLE;
 if(!m)e.mesa_id='Selecciona una mesa';
 if(!Number.isInteger(n)||n<1)e.personas='Indica cuántas personas';else if(m&&n>m.capacidad)e.personas=`Esta mesa admite máximo ${m.capacidad} personas`;
 return e}
export function iniciarReserva(d){
 tick();const e=validar(d),datos={nombre:d.nombre.trim(),documento:norm.doc(d.documento),correo:norm.correo(d.correo),telefono:norm.tel(d.telefono)};
 if(Object.keys(e).every(k=>k==='mesa_id')&&activaDe(datos.correo,datos.documento))throw{msg:MENSAJE_RESERVA_ACTIVA};
 if(Object.keys(e).length)throw{campos:e};
 const m=mesa(d.mesa_id),inicio=fechaBogota(d.fecha_reserva),fin=inicio+DURACION_TURNO;
 if(!mesaLibre(m,inicio,fin)){toast(MENSAJE_MESA_NO_DISPONIBLE,'err');throw{campos:{mesa_id:MENSAJE_MESA_NO_DISPONIBLE}}}
 if(activaDe(datos.correo,datos.documento))throw{msg:MENSAJE_RESERVA_ACTIVA};
 const n=now(),pid=uid('p'),r={id:uid('r'),codigo_reserva:'MS-'+Math.floor(1000+Math.random()*9000),cliente_id:null,datos,mesa_id:m.id,cantidad_personas:Number(d.personas),fecha_reserva:inicio,fecha_fin:fin,fecha_pago_vencimiento:n+3*MIN,fecha_creacion:n,fecha_vencimiento:inicio+ventana(),consumo_minimo:m.consumo_minimo||0,total_inicial:50000+(m.consumo_minimo||0),estado:'pendiente_pago',pago_id:pid};
 db().reservas.push(r);db().pagos.push({id:pid,reserva_id:r.id,monto:50000,moneda:'COP',estado:'pendiente',metodo:null,fecha_pago:null,referencia:null});commit();return r}
export function abandonar(id){const r=res(id);if(!r||r.estado!=='pendiente_pago')return;const s=db();s.reservas=s.reservas.filter(x=>x.id!==id);s.pagos=s.pagos.filter(p=>p.reserva_id!==id);commit();toast('Reserva cancelada','warn')}
export function pagar(id,falla,metodo){
 tick();const r=res(id);if(!r||r.estado!=='pendiente_pago')throw{msg:'El bloqueo de la mesa venció'};
 if(!METODOS_PAGO.includes(metodo))throw{msg:'Selecciona un método de pago para continuar'};
 const p=pagoDe(r.pago_id),n=now();if(p.estado!=='pendiente')throw{msg:'Este pago ya fue procesado'};p.metodo=metodo;
 if(falla){p.estado='fallido';r.estado='cancelada';commit();toast('Pago fallido','err');return false}
 const cita=r.fecha_reserva||n,fin=finReserva(r);
 if(cita+ventana()<=n){r.estado='expirada';p.estado='fallido';commit();throw{msg:'La hora de reserva ya venció'}}
 if(!intervaloLibre(r.mesa_id,cita,fin,r.id))throw{msg:MENSAJE_MESA_NO_DISPONIBLE};
 let c=db().clientes.find(x=>x.documento===r.datos.documento||norm.correo(x.correo)===r.datos.correo);
 if(!c){c={id:uid('c'),...r.datos};db().clientes.push(c);toast('Cliente registrado')}
 r.cliente_id=c.id;p.estado='aprobado';p.fecha_pago=n;p.referencia='SIM-'+Math.floor(Math.random()*1e6);
 r.estado='confirmada';r.fecha_creacion=n;r.fecha_reserva=cita;r.fecha_fin=fin;r.fecha_vencimiento=cita+ventana();r.avisada=false;
 commit();toast('Pago aprobado');toast('Reserva creada');return true}
export function llegada(id){const r=res(id);if(r?.estado!=='confirmada')throw{msg:'Solo se puede registrar llegada de reservas confirmadas'};
 if(r.fecha_reserva>now())throw{msg:'La hora de la reserva aún no comienza'};
 if(r.fecha_vencimiento<=now()){tick();throw{msg:'La reserva ya venció'}}
 r.estado='en_curso';pagoDe(r.pago_id).estado='aplicado';commit();toast('Llegada registrada')}
export function cancelar(id){const r=res(id);if(r?.estado!=='confirmada')throw{msg:'Solo se pueden cancelar reservas confirmadas'};
 pagoDe(r.pago_id).estado=now()-r.fecha_creacion<10*MIN?'reembolsado':'retenido';r.estado='cancelada';r.fecha_cancelacion=now();commit();toast('Reserva cancelada','warn')}
export function cancelarPropia(id){const session=D.currentSession(),r=res(id);if(!session||session.rol!=='cliente')throw{msg:'Inicia sesión como cliente para cancelar una reserva'};if(!r||(r.cliente_id!==session.id&&norm.correo(contacto(r)?.correo)!==norm.correo(session.correo)))throw{msg:'No puedes cancelar una reserva de otro cliente'};if(r.estado==='pendiente_pago'){const s=db();s.reservas=s.reservas.filter(item=>item.id!==id);s.pagos=s.pagos.filter(p=>p.reserva_id!==id);commit();toast('Bloqueo de mesa cancelado','warn');return true}return cancelar(id)}
export function finalizar(id){const r=res(id);if(r?.estado!=='en_curso')throw{msg:'Solo se finalizan reservas en curso'};
 r.estado='finalizada';r.fecha_finalizacion=now();commit();toast('Visita finalizada')}
export function ocupar(mid){const m=mesa(mid);if(!mesaLibre(m))throw{msg:'La mesa no está disponible'};m.estado='ocupada';m.ocupacion_manual=true;commit()}
export function liberar(mid){const m=mesa(mid),r=reservaDeMesa(mid);if(r?.estado==='en_curso')return finalizar(r.id);if(!m.ocupacion_manual)throw{msg:'Solo se liberan mesas ocupadas manualmente'};m.estado='disponible';m.ocupacion_manual=false;commit();toast('Mesa liberada')}
export function tick(){let ch=false;const n=now(),u=db().config.umbral*MIN;
 for(const r of db().reservas){
  if(r.estado==='pendiente_pago'&&(r.fecha_pago_vencimiento||r.fecha_vencimiento)<=n){r.estado='expirada';pagoDe(r.pago_id).estado='fallido';ch=true;toast('El bloqueo de pago venció','warn')}
  else if(r.estado==='confirmada'){
    if(r.fecha_vencimiento<=n){r.estado='expirada';r.fecha_expiracion=n;pagoDe(r.pago_id).estado='retenido';ch=true;toast('La reserva ha vencido','err')}
   else if(r.fecha_vencimiento-n<u&&!r.avisada){r.avisada=true;ch=true;toast(`La reserva ${r.codigo_reserva} está próxima a vencer`,'warn')}}
    else if(r.estado==='en_curso'&&finReserva(r)<=n){r.estado='finalizada';r.fecha_finalizacion=n;ch=true;toast(`El turno de ${r.codigo_reserva} terminó; la mesa está disponible`,'ok')}}
 if(ch)commit()}
export function adelantar(min){db().config.offset+=min*MIN;commit();tick()}
export function simularHora(valor){const instante=fechaBogota(valor);if(!Number.isFinite(instante))throw{msg:'Selecciona una fecha y hora válidas'};db().config.offset=instante-Date.now();commit();tick();toast('Hora de demostración actualizada','warn')}
export function restaurarHora(){db().config.offset=0;commit();tick();toast('Reloj real restaurado')}
export function setConfig(k,v){const n=Number(v);if(!Number.isInteger(n)||n<=0)throw{msg:'Valor inválido'};db().config[k]=n;commit();toast('Configuración guardada')}
export function guardarProducto(p){const e={};
 if(p.nombre.trim().length<3)e.nombre='Mínimo 3 caracteres';
 if(p.descripcion.trim().length<5)e.descripcion='Describe el producto';
 if(!Number.isInteger(p.precio)||p.precio<=0)e.precio='Precio entero mayor a 0';
 if(p.imagen_url&&!p.imagen_url.startsWith('assets/images/dishes/'))e.imagen_url='Usa una ruta dentro de assets/images/dishes/';
 if(Object.keys(e).length)throw{campos:e};
 const ruta=`assets/images/dishes/${imageCategoryPath(p.categoria)}/${imageSlug(p.nombre)}.webp`,producto={...p,imagen_url:p.imagen_url||ruta,imagen_prompt:p.imagen_prompt||buildImagePrompt(p.nombre,p.categoria)};
 if(p.id)Object.assign(db().productos.find(x=>x.id===p.id),producto);else db().productos.push({...producto,id:uid('pr')});
 commit();toast('Producto guardado')}
export function toggleProducto(id){const p=db().productos.find(x=>x.id===id);p.disponible=!p.disponible;commit()}
export function eliminarProducto(id){db().productos=db().productos.filter(x=>x.id!==id);commit();toast('Producto eliminado','warn')}
