# SISTEMA WEB DE GESTIÓN DE RESTAURANTES

## 1. Rol y experiencia

Actúa como un **Senior Full Stack Developer, Software Architect y UI/UX Designer**, especializado en aplicaciones web modernas, sistemas de gestión, plataformas interactivas y experiencias digitales para el sector gastronómico.

Tu objetivo es diseñar y construir una aplicación web funcional, intuitiva, elegante y escalable para administrar un restaurante, controlar la disponibilidad de sus mesas, visualizar el menú y gestionar reservas con reglas de negocio estrictas.

No quiero únicamente una propuesta visual o un conjunto de pantallas estáticas. Necesito una aplicación interactiva, con componentes reutilizables, lógica funcional y una arquitectura preparada para incorporar un backend real.

## 2. Objetivo del proyecto

Desarrollar una plataforma web para la gestión de un restaurante que permita:

- Visualizar el plano de distribución de las mesas.
- Consultar en tiempo real la disponibilidad de cada mesa.
- Diferenciar mesas disponibles, reservadas y ocupadas.
- Consultar el menú del restaurante, organizado por categorías y precios.
- Crear y administrar reservas.
- Registrar los datos de los clientes.
- Simular el pago obligatorio de un anticipo para confirmar una reserva.
- Controlar automáticamente el vencimiento de las reservas mediante un temporizador de 30 minutos.

Toda la interfaz debe estar en español y utilizar pesos colombianos (COP).

## 3. Arquitectura visual y diseño UI/UX

Implementa un diseño **minimalist-chic**, inspirado en restaurantes modernos, exclusivos y contemporáneos.

### Identidad visual

Utiliza una combinación equilibrada de:

- Fondos claros en tonos crema, marfil o beige.
- Tipografía elegante y altamente legible.
- Elementos oscuros para generar contraste.
- Detalles en tonos verde oliva, dorado suave o terracota.
- Tarjetas con bordes ligeramente redondeados.
- Sombras sutiles.
- Iconografía moderna y consistente.
- Animaciones suaves para las interacciones.

Evita una interfaz sobrecargada, colores excesivamente saturados o elementos visuales innecesarios.

### Estructura general

Organiza la aplicación mediante un menú lateral o una barra de navegación que permita acceder a las siguientes secciones:

1. Dashboard.
2. Plano de mesas.
3. Reservas.
4. Menú del restaurante.
5. Clientes.
6. Configuración.

El diseño debe ser responsive y adaptarse correctamente a computadores, tablets y dispositivos móviles.

## 4. Dashboard principal

Crea un panel administrativo que muestre un resumen visual del estado del restaurante.

Incluye:

- Total de mesas.
- Mesas disponibles.
- Mesas reservadas.
- Mesas ocupadas.
- Reservas activas.
- Reservas próximas a vencer.
- Número de clientes registrados.

Utiliza tarjetas estadísticas y gráficos sencillos cuando aporten información útil.

Los indicadores deben actualizarse cuando cambie el estado de una mesa o reserva.

## 5. Plano interactivo de mesas

Esta es una de las funcionalidades principales.

Diseña un plano visual e interactivo del restaurante que represente la ubicación de las mesas.

Cada mesa debe tener:

- Identificador único (Mesa 01, Mesa 02, etc.).
- Capacidad de personas.
- Estado actual.
- Indicador visual de disponibilidad.

### Estados de las mesas

Utiliza los siguientes estados:

- **Disponible:** verde.
- **Reservada:** amarillo o naranja.
- **Ocupada:** rojo.

Cada mesa debe ser seleccionable.

Al hacer clic sobre una mesa, muestra un panel o ventana con:

- Número de mesa.
- Capacidad.
- Estado.
- Información de la reserva, si existe.
- Nombre del cliente, si corresponde.
- Tiempo restante de reserva, si está reservada.

### Restricciones

- Una mesa ocupada no puede reservarse.
- Una mesa reservada tampoco puede asignarse a otro cliente.
- Una mesa solo puede liberarse cuando la reserva vence, se cancela o el cliente finaliza su visita.
- Los cambios de estado deben reflejarse automáticamente en el plano.

## 6. Menú del restaurante

Crea una sección donde los clientes y administradores puedan consultar el menú.

Organiza los productos por categorías:

- Entradas.
- Platos principales.
- Pastas.
- Hamburguesas.
- Bebidas.
- Postres.

Cada producto debe incluir:

- Nombre.
- Imagen ilustrativa.
- Descripción.
- Precio.
- Categoría.
- Disponibilidad.

Utiliza el formato de moneda colombiana:

**$50.000 COP**

Implementa filtros por categoría y una presentación visual mediante tarjetas.

Los administradores deben contar con una estructura que permita agregar, editar, ocultar o eliminar productos.

Los precios deben almacenarse como valores numéricos enteros en COP y formatearse visualmente utilizando la configuración regional `es-CO`.

## 7. Sistema de reservas

Implementa un flujo completo de reservas.

### Formulario de reserva

El cliente debe proporcionar obligatoriamente:

- Nombre completo.
- Número de documento o cédula.
- Correo electrónico.
- Número de teléfono.
- Cantidad de personas.
- Mesa que desea reservar.

Antes de confirmar, el sistema debe comprobar la disponibilidad de la mesa y validar la identidad del cliente.

### Regla 1: No permitir reservar mesas ocupadas

El sistema debe verificar el estado de la mesa antes de crear una reserva.

Si está ocupada o reservada, debe impedir la operación y mostrar un mensaje claro:

"No es posible reservar esta mesa porque actualmente no está disponible. Selecciona otra mesa".

### Regla 2: Un cliente solo puede tener una reserva activa

Un mismo cliente no puede mantener más de una reserva activa simultáneamente.

Identifica al cliente mediante su correo electrónico o número de cédula.

La validación debe:

- Normalizar los correos electrónicos (eliminar espacios y convertirlos a minúsculas).
- Normalizar los documentos para evitar registros duplicados por diferencias de formato.
- Consultar si ya existe una reserva activa asociada al correo o documento.
- Rechazar la nueva reserva si cualquiera de esos identificadores coincide con una reserva activa.

Mensaje de error:

"Ya tienes una reserva activa. Para realizar otra, primero debes cancelar o finalizar la reserva existente".

Una reserva cancelada, vencida o finalizada no debe bloquear futuras reservas.

### Regla 3: Temporizador obligatorio de 30 minutos

Cada reserva confirmada tendrá una vigencia de **30 minutos para que el cliente llegue al restaurante**.

El temporizador comenzará después de completar satisfactoriamente el pago anticipado.

Implementa:

- Un contador regresivo visible.
- Actualización automática cada segundo.
- Registro de la fecha y hora de creación.
- Registro de la fecha y hora de vencimiento.
- Comparación con la hora actual para determinar si la reserva sigue vigente.

Cuando el contador llegue a cero:

1. Cambiar el estado de la reserva a `expirada`.
2. Cambiar el estado de la mesa a `disponible`.
3. Eliminar la asociación activa entre el cliente y la mesa.
4. Actualizar automáticamente el plano.
5. Mostrar una notificación indicando que la reserva venció.

**Importante:** el vencimiento no debe depender exclusivamente de `setInterval`. El sistema debe comprobar las fechas de vencimiento al iniciar la aplicación y al recuperar el foco de la pestaña, para evitar que una reserva permanezca activa después de cerrar el navegador.

En producción, el vencimiento debe validarse también desde el backend mediante la hora del servidor y un proceso programado.

### Regla 4: Pago anticipado obligatorio

Para confirmar una reserva, el cliente debe realizar un anticipo obligatorio de:

# $50.000 COP

Implementa una pantalla de confirmación de pago que muestre:

- Información del cliente.
- Mesa seleccionada.
- Cantidad de personas.
- Valor del anticipo.
- Resumen de la reserva.
- Botón para realizar el pago.

Para esta primera versión, utiliza un sistema de pago simulado.

El comportamiento debe ser:

1. El cliente completa sus datos.
2. El sistema valida la mesa y la identidad.
3. El cliente visualiza el anticipo de $50.000 COP.
4. Selecciona "Pagar y confirmar reserva".
5. Se simula una transacción exitosa.
6. Se registra el pago como aprobado.
7. Se confirma la reserva.
8. La mesa cambia a estado `reservada`.
9. Se inicia el temporizador de 30 minutos.
10. Se muestra una pantalla de confirmación.

Si el pago falla o se cancela, la reserva no debe confirmarse y la mesa debe permanecer disponible.

No simules un pago exitoso antes de que el usuario pulse el botón de confirmación.

## 8. Gestión de reservas

Crea una sección administrativa donde sea posible consultar todas las reservas.

Cada registro debe mostrar:

- Código de reserva.
- Nombre del cliente.
- Documento.
- Correo electrónico.
- Teléfono.
- Número de mesa.
- Cantidad de personas.
- Fecha y hora de creación.
- Fecha y hora de vencimiento.
- Estado de la reserva.
- Estado del pago.

Implementa filtros por:

- Reservas activas.
- Reservas vencidas.
- Reservas canceladas.
- Reservas finalizadas.

El administrador debe poder:

- Consultar los detalles.
- Cancelar una reserva.
- Registrar la llegada del cliente.
- Marcar una reserva como finalizada.

Cuando el administrador registre la llegada del cliente, la reserva debe pasar al estado `en curso` y la mesa debe cambiar a `ocupada`.

Una reserva cancelada o vencida debe liberar la mesa.

## 9. Modelo de datos

Estructura la aplicación con entidades claras y relaciones consistentes.

### Cliente

- id
- nombre
- documento
- correo
- telefono

### Mesa

- id
- numero
- capacidad
- estado
- ubicacion

### Reserva

- id
- codigo_reserva
- cliente_id
- mesa_id
- cantidad_personas
- fecha_creacion
- fecha_vencimiento
- estado
- pago_id

### Pago

- id
- reserva_id
- monto
- moneda
- estado
- fecha_pago
- referencia

### Producto

- id
- nombre
- descripcion
- categoria
- precio
- imagen
- disponible

Utiliza identificadores únicos y relaciones adecuadas entre las entidades.

Los estados deben manejarse mediante valores consistentes y centralizados, evitando cadenas diferentes para representar el mismo estado.

## 10. Arquitectura y tecnologías

Utiliza una arquitectura limpia, modular y fácil de mantener.

Tecnologías preferidas:

- HTML5.
- Tailwind CSS.
- JavaScript vanilla o React, según las capacidades de Stitch.
- Componentes reutilizables.
- LocalStorage para persistencia de demostración.
- Preparación para integración con Supabase o un backend equivalente.

Separa las responsabilidades en módulos:

- Gestión de mesas.
- Gestión de clientes.
- Gestión de reservas.
- Temporizador y vencimiento.
- Gestión de pagos.
- Menú del restaurante.
- Actualización de interfaz.

Evita concentrar toda la lógica en un único archivo o componente.

### Sincronización en tiempo real

La aplicación debe actualizar el plano de mesas y los indicadores del dashboard cada vez que cambie una reserva.

En la versión de demostración, puedes utilizar eventos de JavaScript y persistencia local.

Sin embargo, deja preparada la arquitectura para integrar Supabase Realtime o WebSockets, de modo que varios usuarios y dispositivos puedan visualizar los mismos cambios.

No afirmes que LocalStorage proporciona sincronización en tiempo real entre dispositivos.

### Seguridad y consistencia

En una implementación de producción:

- Las validaciones críticas deben ejecutarse en el backend.
- La creación de reservas debe ser atómica.
- La comprobación de disponibilidad y la asignación de la mesa deben ocurrir dentro de una transacción.
- Debe existir una restricción que impida reservas activas duplicadas por cliente.
- El vencimiento debe calcularse con la hora del servidor.
- Los pagos deben verificarse mediante un proveedor de pagos y confirmaciones del servidor.

El pago simulado de esta versión no debe presentarse como una transacción financiera real.

## 11. Experiencia de usuario y notificaciones

Implementa notificaciones visuales para las acciones importantes:

- Reserva creada.
- Pago aprobado.
- Mesa ocupada.
- Mesa no disponible.
- Cliente con reserva activa.
- Reserva próxima a vencer.
- Reserva vencida.
- Reserva cancelada.
- Cliente registrado correctamente.

Utiliza notificaciones tipo toast y ventanas de confirmación cuando sea necesario.

Incluye estados de carga, validaciones de formularios, mensajes de error y estados vacíos.

Evita recargar toda la página para actualizar la información.

## 12. Flujos de usuario obligatorios

### Flujo A: Crear una reserva

1. El cliente ingresa al sistema.
2. Consulta el plano de mesas.
3. Selecciona una mesa disponible.
4. Completa sus datos.
5. El sistema valida sus identificadores.
6. El sistema comprueba que no tenga otra reserva activa.
7. El sistema vuelve a verificar la disponibilidad de la mesa.
8. Se muestra el anticipo de $50.000 COP.
9. El cliente realiza el pago simulado.
10. La reserva queda confirmada.
11. La mesa cambia a reservada.
12. Se inicia el temporizador de 30 minutos.

### Flujo B: Cliente llega al restaurante

1. El cliente llega antes de que termine el tiempo.
2. El administrador localiza su reserva.
3. Registra la llegada.
4. La reserva cambia a `en curso`.
5. La mesa cambia a `ocupada`.
6. Se detiene el temporizador de llegada.

### Flujo C: Reserva vencida

1. El cliente realiza una reserva.
2. Se inicia el temporizador.
3. Transcurren los 30 minutos sin registrar su llegada.
4. El sistema detecta el vencimiento.
5. La reserva cambia a `expirada`.
6. La mesa vuelve a estar disponible.
7. La información visual se actualiza automáticamente.

### Flujo D: Intento de reserva duplicada

1. Un cliente realiza una reserva.
2. Intenta reservar otra mesa utilizando el mismo correo o documento.
3. El sistema detecta la reserva activa.
4. La operación es rechazada.
5. Se muestra el mensaje correspondiente.

### Flujo E: Intento de reservar una mesa ocupada

1. El cliente selecciona una mesa ocupada.
2. El sistema detecta su estado.
3. Impide continuar con la reserva.
4. Informa que debe seleccionar otra mesa.

## 13. Requisitos de calidad y pruebas

Antes de considerar terminada la aplicación, verifica los siguientes escenarios:

- No permite reservar mesas ocupadas.
- No permite reservar mesas ya reservadas.
- No permite que un cliente tenga dos reservas activas.
- Detecta coincidencias por correo y por documento.
- Exige el anticipo de $50.000 COP.
- No confirma reservas con pagos fallidos.
- Inicia correctamente los 30 minutos después del pago aprobado.
- Expira las reservas automáticamente.
- Libera las mesas cuando corresponde.
- No mantiene reservas vencidas después de reiniciar la aplicación.
- Permite registrar la llegada antes del vencimiento.
- Cambia correctamente la mesa a ocupada.
- Actualiza los indicadores y el plano.
- Presenta correctamente los valores en pesos colombianos.

## 14. Entregables esperados

Construye la aplicación en lugar de limitarte a describirla.

Entrega:

1. Interfaz visual completa.
2. Dashboard administrativo.
3. Plano interactivo de mesas.
4. Menú con categorías y precios.
5. Formulario funcional de reservas.
6. Sistema de validación de clientes únicos.
7. Simulación del pago anticipado.
8. Temporizador funcional de 30 minutos.
9. Liberación automática de mesas.
10. Panel de administración de reservas.
11. Persistencia de datos para la demostración.
12. Estructura modular del código.
13. Instrucciones para ejecutar y probar el proyecto.
14. Documentación de los puntos que requieren backend para funcionar en producción.

### Instrucción final

Prioriza la funcionalidad, la integridad de las reglas de negocio y una experiencia de usuario profesional.

No elimines, simplifiques ni sustituyas las validaciones obligatorias por elementos meramente visuales.

No utilices botones decorativos que no ejecuten ninguna acción. Cada botón, formulario, filtro y elemento interactivo debe tener un comportamiento definido.

Cuando una funcionalidad dependa de un backend, implementa una simulación funcional para la demostración y deja claramente definida la integración necesaria para producción.

El resultado debe sentirse como un producto SaaS real de gestión gastronómica: moderno, elegante, intuitivo, consistente y preparado para evolucionar.
--------------------------------------segundo prompt--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
# SISTEMA WEB DE GESTIÓN DE RESTAURANTES: "MESA SERVIDA"

## 1. Rol y objetivo
Actúa como Senior UI/UX Designer y Front-End Developer especializado en SaaS para el sector gastronómico. Diseña y construye una aplicación web interactiva, responsive y en español para administrar un restaurante: plano de mesas, menú, reservas con anticipo y control automático de vencimiento.

Toda la interfaz debe estar en español, con moneda en pesos colombianos (COP), formato regional es-CO (ejemplo: $50.000 COP) y zona horaria America/Bogota. Los precios se guardan como enteros.

No quiero pantallas estáticas: cada botón, filtro, formulario y tarjeta debe tener un comportamiento definido. No uses botones decorativos.

## 2. Estilo visual (minimalist-chic)
- Fondos crema, marfil o beige; elementos oscuros (carbón o verde bosque muy oscuro) para contraste.
- Acentos en verde oliva, dorado suave o terracota.
- Tipografía elegante: serif para títulos (por ejemplo Playfair Display o Cormorant) y sans-serif legible para texto (por ejemplo Inter).
- Tarjetas con bordes redondeados, sombras sutiles, iconografía lineal consistente, animaciones suaves.
- Evitar saturación, sobrecarga y elementos innecesarios.
- Responsive: menú lateral en escritorio y tablet; barra inferior o menú hamburguesa en móvil.

## 3. Navegación y roles
Menú lateral con: Dashboard, Plano de mesas, Reservas, Menú, Clientes, Configuración.
No hay login. Incluye un selector de rol simulado en la parte superior: "Cliente" o "Administrador".
- Cliente: ve el plano, el menú y puede crear una reserva.
- Administrador: ve todo y puede gestionar reservas, mesas, productos y configuración.

## 4. Estados centralizados (usar exactamente estos valores, sin variantes)
- Mesa: `disponible` (verde), `reservada` (naranja), `ocupada` (rojo).
- Reserva: `pendiente_pago`, `confirmada`, `en_curso`, `finalizada`, `cancelada`, `expirada`.
- Pago: `pendiente`, `aprobado`, `fallido`, `reembolsado`, `retenido`, `aplicado`.
- Reserva activa = `pendiente_pago`, `confirmada` o `en_curso`.
- Reservas no activas (no bloquean nuevas reservas): `finalizada`, `cancelada`, `expirada`.

## 5. Modelo de datos
- Cliente: id, nombre, documento, correo, telefono.
- Mesa: id, numero, capacidad, estado, ubicacion.
- Reserva: id, codigo_reserva, cliente_id, mesa_id, cantidad_personas, fecha_creacion, fecha_vencimiento, estado, pago_id.
- Pago: id, reserva_id, monto, moneda, estado, fecha_pago, referencia.
- Producto: id, nombre, descripcion, categoria, precio, imagen, disponible.
Usa identificadores únicos y relaciones consistentes entre entidades.

## 6. Datos de demostración (semilla)
- 12 mesas: 4 en Terraza, 6 en Salón principal, 2 en Barra. Capacidades de 2, 4, 6 y 8 personas.
- Estado inicial: 7 disponibles, 3 reservadas (con temporizadores distintos) y 2 ocupadas.
- Menú: 4 productos por categoría (Entradas, Platos principales, Pastas, Hamburguesas, Bebidas, Postres) con precios realistas en COP. Imágenes: usa placeholders ilustrativos locales (bloques de color con ícono), nunca enlaces externos que puedan romperse.
- 5 clientes de ejemplo y algunas reservas históricas (finalizadas, canceladas y expiradas).

## 7. Pantallas

### 7.1 Dashboard
Tarjetas estadísticas: total de mesas, disponibles, reservadas, ocupadas, reservas activas, reservas próximas a vencer (menos de 5 minutos) y clientes registrados. Incluye un gráfico simple de ocupación (dona o barras) y una lista de reservas próximas a vencer con su contador. Todo se actualiza cuando cambia una mesa o reserva.

### 7.2 Plano de mesas
Plano visual del restaurante con zonas (Terraza, Salón, Barra). Cada mesa muestra su identificador (Mesa 01, Mesa 02...), capacidad y color según estado. Incluye una leyenda de colores.
Al hacer clic en una mesa se abre un panel lateral o modal con: número, capacidad, estado, ubicación y, si existe reserva, nombre del cliente, código, hora de vencimiento y tiempo restante en vivo.
- Mesa disponible: botón "Reservar esta mesa" (lleva al formulario con la mesa preseleccionada).
- Mesa reservada u ocupada: botón de reservar deshabilitado y el mensaje "No es posible reservar esta mesa porque actualmente no está disponible. Selecciona otra mesa".
- Administrador: también puede "Ocupar mesa sin reserva" (clientes que llegan sin reservar) y "Liberar mesa" cuando el cliente termina su visita.
Una mesa solo se libera cuando la reserva vence, se cancela o el cliente finaliza su visita.

### 7.3 Formulario de reserva (paso 1)
Campos obligatorios: nombre completo, documento o cédula, correo, teléfono, cantidad de personas y mesa.
Modelo: reserva inmediata. El cliente reserva ahora y tiene 30 minutos para llegar (no hay selector de fecha futura).
Validaciones (solo de formato, ya que sin backend no se puede verificar identidad real):
- Correo con formato válido; se normaliza (sin espacios, en minúsculas).
- Documento solo numérico, de 6 a 10 dígitos; se normaliza (sin puntos, espacios ni guiones).
- Teléfono colombiano de 10 dígitos que inicia en 3.
- La cantidad de personas no puede superar la capacidad de la mesa. Mensaje: "Esta mesa admite máximo X personas".
- Se vuelve a verificar la disponibilidad de la mesa antes de continuar.
- Regla de cliente único: si el correo o el documento normalizados coinciden con una reserva activa, se rechaza con el mensaje: "Ya tienes una reserva activa. Para realizar otra, primero debes cancelar o finalizar la reserva existente".
Mensajes de error junto a cada campo y estados de carga en los botones.

### 7.4 Pago anticipado (paso 2)
Pantalla de resumen: datos del cliente, mesa, ubicación, cantidad de personas y anticipo obligatorio de **$50.000 COP**. Aclara visiblemente: "Pago simulado para demostración. No es una transacción real".
- Al pasar a esta pantalla, la mesa queda bloqueada temporalmente por 3 minutos (estado de reserva `pendiente_pago`) para que nadie más la tome mientras se paga. Muestra un contador de ese bloqueo.
- Botón principal "Pagar y confirmar reserva". Nunca se aprueba el pago antes de que el usuario lo pulse.
- Botón secundario "Cancelar" (libera la mesa y no crea reserva).
- Un interruptor visible de "Modo de prueba: simular fallo de pago" para poder probar el caso fallido.
- Pago aprobado: pago `aprobado`, reserva `confirmada`, mesa `reservada`, se inicia el temporizador y se muestra la pantalla de confirmación.
- Pago fallido o bloqueo expirado: la reserva no se confirma, la mesa sigue `disponible` y se muestra un mensaje con opción de reintentar.

### 7.5 Confirmación de reserva
Código de reserva, mesa, cliente, anticipo pagado, hora de creación, hora de vencimiento y un contador regresivo grande de 30 minutos. Botones: "Ver mi reserva", "Cancelar reserva" y "Volver al plano".

### 7.6 Gestión de reservas (administrador)
Tabla con: código, cliente, documento, correo, teléfono, mesa, personas, fecha de creación, fecha de vencimiento, estado de reserva, estado de pago y tiempo restante en vivo. En móvil, se muestra como tarjetas.
Filtros por pestañas: Activas, Vencidas, Canceladas, Finalizadas (más "Todas") y búsqueda por nombre, documento o código.
Acciones por reserva:
- Ver detalles (modal).
- Registrar llegada: solo si está `confirmada`. Pasa a `en_curso`, la mesa a `ocupada` y se detiene el temporizador. El anticipo pasa a `aplicado` (se descuenta de la cuenta).
- Cancelar: pide confirmación. La reserva pasa a `cancelada` y libera la mesa. El anticipo pasa a `reembolsado` si se cancela antes de 10 minutos desde su creación; si no, a `retenido`.
- Marcar como finalizada: solo si está `en_curso`. Libera la mesa.
Cuando una reserva vence, el anticipo pasa a `retenido`.

### 7.7 Menú del restaurante
Tarjetas de producto con imagen, nombre, descripción, precio ($50.000 COP) y etiqueta de disponibilidad. Filtros por categoría (Todas, Entradas, Platos principales, Pastas, Hamburguesas, Bebidas, Postres) y buscador.
Administrador: botones funcionales para agregar, editar, ocultar/mostrar y eliminar productos (con confirmación) mediante un modal con formulario validado. Los productos ocultos o no disponibles no se muestran al cliente.

### 7.8 Clientes
Lista de clientes registrados con nombre, documento, correo, teléfono, número de reservas y estado actual (con reserva activa o sin ella). Búsqueda por nombre o documento. Al abrir un cliente se ve su historial de reservas y pagos. Estado vacío si no hay resultados.

### 7.9 Configuración
- Monto del anticipo (por defecto 50.000 COP).
- Duración del temporizador de llegada (por defecto 30 minutos; con opciones de 1, 2, 5, 15 y 30 minutos para poder demostrar el vencimiento rápidamente).
- Umbral de "próxima a vencer" (por defecto 5 minutos).
- Botón "Restablecer datos de demostración" (con confirmación).
- Botón "Simular paso del tiempo" para adelantar el reloj y probar vencimientos.

## 8. Temporizador y vencimiento
- El temporizador inicia solo después de que el pago se aprueba, y se actualiza cada segundo.
- Se registran fecha_creacion y fecha_vencimiento, y se compara con la hora actual para determinar vigencia.
- Cuando llega a cero: la reserva pasa a `expirada`, la mesa a `disponible`, el pago a `retenido`, se elimina la asociación activa cliente-mesa, el plano y el dashboard se actualizan y aparece una notificación: "La reserva ha vencido".
- El vencimiento no depende solo de setInterval: también se verifica al iniciar la aplicación y cuando la pestaña recupera el foco, para que no existan reservas vencidas después de cerrar el navegador.
- Aviso tipo toast cuando una reserva queda por debajo del umbral de "próxima a vencer".

## 9. Notificaciones y experiencia de usuario
Toasts para: reserva creada, pago aprobado, pago fallido, mesa ocupada o no disponible, cliente con reserva activa, reserva próxima a vencer, reserva vencida, reserva cancelada, cliente registrado.
Modales de confirmación para acciones destructivas. Incluye estados de carga, validaciones, mensajes de error y estados vacíos. Sin recargar la página.

## 10. Arquitectura
- HTML5, Tailwind CSS y JavaScript vanilla (o React si Stitch lo permite).
- Componentes reutilizables y código modular: mesas, clientes, reservas, temporizador, pagos, menú y actualización de interfaz. No concentrar la lógica en un solo archivo.
- Persistencia de demostración con LocalStorage y comunicación entre módulos mediante eventos de JavaScript.
- LocalStorage NO sincroniza entre dispositivos; deja la capa de datos abstraída (repositorios o servicios) para reemplazarla después por Supabase y Supabase Realtime.
- Las reglas críticas deben vivir en una capa de servicio única y no en los componentes visuales.

## 11. Para producción (documentar en la app, en una sección o archivo "Notas de producción")
- Validaciones críticas, creación atómica de reservas y comprobación de disponibilidad dentro de una transacción en el backend.
- Restricción única en base de datos que impida más de una reserva activa por cliente (correo y documento).
- Vencimiento calculado con la hora del servidor y un proceso programado.
- Pagos reales mediante un proveedor (por ejemplo Wompi, PayU o Mercado Pago) con confirmación por webhook del servidor.
- Verificación de identidad real y control de acceso por roles con autenticación.
- El pago de esta versión es simulado y no debe presentarse como una transacción financiera real.

## 12. Escenarios que deben funcionar
1. No se puede reservar una mesa ocupada ni una ya reservada.
2. No se puede tener dos reservas activas (detecta coincidencia por correo y por documento).
3. No se puede reservar más personas que la capacidad de la mesa.
4. El anticipo de $50.000 COP es obligatorio.
5. Con pago fallido no se confirma la reserva y la mesa sigue disponible.
6. Los 30 minutos inician solo tras el pago aprobado.
7. Las reservas expiran solas, liberan la mesa y actualizan plano y dashboard.
8. Tras recargar o reabrir la app no queda ninguna reserva vencida activa.
9. Se puede registrar la llegada antes del vencimiento (reserva `en_curso`, mesa `ocupada`).
10. Una reserva cancelada, expirada o finalizada no bloquea futuras reservas.
11. Todos los valores se muestran en formato COP es-CO.

Prioriza la integridad de las reglas de negocio y una experiencia profesional y consistente. No simplifiques ni sustituyas validaciones por elementos visuales. El resultado debe sentirse como un producto SaaS real de gestión gastronómica.
---------------------------------------------------------------------------------------------------tercer promtp---------------------------------------------------------------------------------------------------------------------------------
# TAREA PARA COPILOT — MesaServida (carpeta restaurante-main/)

Contexto: app web estática (HTML + Tailwind CDN + JavaScript con módulos ES + LocalStorage). Archivos en restaurante-main/: index.html, js/ (main.js, store.js, services.js, ui.js, catalog.js, impact.js), assets/, docs/, tests/run.mjs. Todas las rutas son RELATIVAS a restaurante-main/ (nunca "/restaurante-main/" escrito a mano). Al citar archivos, usa la ruta completa desde la raíz del repo. El pago es simulado y debe indicarse en pantalla. No muevas reglas de negocio de js/services.js a la interfaz.

## PARTE A — Herramientas de simulación: solo para el administrador

Hoy existen tres herramientas de simulación visibles o accesibles para cualquiera:
1. Panel "Simulador de tiempo" (index.html, id="timewarp"): reloj demo, selector de fecha/hora y botón "Ir".
2. Interruptor "Modo de prueba: simular pago rechazado" en la pantalla de pago (js/ui.js, función pago()).
3. Botones "Simular paso del tiempo (+5 min)" y de restablecer datos en Configuración (js/ui.js).

Requisitos:
- Un cliente (rol "cliente") NO debe ver ni poder usar ninguna de las tres: ni el panel de tiempo, ni el interruptor de pago rechazado, ni los botones de Configuración. La pantalla de pago del cliente solo muestra métodos de pago y el botón "Pagar y confirmar reserva".
- El administrador conserva las tres herramientas. Agrúpalas en un único panel plegable "Herramientas de demostración" con un aviso claro: "Solo visible para administradores. No afecta a clientes reales".
- La restricción NO puede ser solo visual (clases CSS o `hidden`). Valida el rol en js/services.js: las funciones que adelantan el reloj, fijan la hora demo, restablecen datos o fuerzan el fallo de pago deben lanzar un error si la sesión no es de administrador. El cliente nunca debe poder activar "pago rechazado" ni desde la consola ni desde el DOM.
- Si el rol cambia (cierre de sesión o cambio de cuenta), el panel se oculta o se muestra de inmediato, sin recargar la página.
- Si la hora demo estaba activa y entra un cliente, el reloj debe volver a la hora real para ese cliente.
- Añade pruebas en tests/run.mjs: (1) un cliente no puede adelantar el reloj, (2) un cliente no puede forzar un pago fallido, (3) un administrador sí puede, (4) la hora demo no se aplica a una sesión de cliente.

## PARTE B — Tema visual "Viaje interestelar en una caverna etrusca" (mantener y completar)

Ya existe un bloque <style id="tema-etrusco"> en index.html con la paleta, tipografías (Cinzel + DM Sans), superficies de piedra y atmósfera. Conserva ese bloque y completa lo siguiente:

1. Paleta y estados: fondo obsidiana #0c0a10, superficies #1a1620 y #262030, ámbar #e0902f (acento principal), oro apagado #c9a24b (líneas), violeta #3a1f66 y #6b3fb0 (atmósfera), terracota #a85a3c, texto marfil #efe6d6. Estados: disponible = oro/ámbar claro, reservada = violeta luminoso, ocupada = rojo brasa #c4452f. Prohibidos el cian y el verde neón. Contraste AA mínimo (4.5:1) en todo texto.
2. Plano de mesas como constelaciones (pieza estrella): 4 cuadrantes de piedra = las 4 zonas, con 15 mesas cada una. Cada mesa es una estrella en SVG: tamaño según la capacidad, puntos alrededor como sillas, líneas finas doradas que unen mesas cercanas, y una constelación nombrada por zona (Orión, Casiopea, Lira, Cisne). El estado se distingue por color Y por forma: disponible = anillo vacío con brillo suave, reservada = anillo con arco del tiempo restante, ocupada = núcleo relleno con brasa. Hover o foco con tooltip (número, capacidad, estado), selección con halo dorado, panel lateral con el detalle, filtros por zona, capacidad y "solo disponibles", y navegación con teclado. En móvil (375 px), acordeón por zona con áreas táctiles de 44 px y alternativa en lista.
3. Imagen de portada: usa assets/images/brand/hero.webp (16:9, máx. 400 KB) solo en el login y en el encabezado del dashboard, siempre con capa oscura encima. Si el archivo no existe, usa el degradado actual sin romper nada.
4. Menú: tarjetas 4:3 con foto; si el producto tiene datos reales (tiempo de preparación, porción, alérgenos), dibuja una capa fina de vectores dorados con esos datos; si falta el dato, no dibujes el vector. Añade esos campos opcionales a js/catalog.js y a la migración de js/store.js.
5. Contención: un solo efecto protagonista por pantalla, nada de efectos detrás de tablas o formularios, máximo 3 elementos animados a la vez, respeta prefers-reduced-motion, sin librerías de gráficos ni de animación, solo los orígenes ya permitidos en index.html (Tailwind CDN y Google Fonts). Cero emojis. Textos en español colombiano, cálidos y específicos, sin frases genéricas de IA.
6. Revisa el contraste y la legibilidad de la pantalla de pago (métodos de pago, aviso de retención de turno, contador) y de los modales con el nuevo tema.

## Reglas de entrega
- Ejecuta `node restaurante-main/tests/run.mjs` antes de entregar; todas las pruebas deben pasar.
- Entrega: lista de archivos modificados con ruta completa, resumen de cambios y cómo verificar en escritorio (1280 px) y móvil (375 px), tanto como cliente como administrador.
- Si algo no se pudo hacer, dilo y explica por qué, en vez de simularlo.
