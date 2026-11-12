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
