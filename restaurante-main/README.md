# MESASERVIDA

Panel web para gestión de sala y reservas de restaurante. Se ejecuta como aplicación estática con módulos JavaScript nativos y guarda la demostración en LocalStorage.

## Ejecutar

Sirve la carpeta `restaurante/` desde `localhost` (por ejemplo, con la extensión Live Server); Web Crypto requiere un contexto seguro para derivar contraseñas. No requiere paquetes adicionales. La primera visita carga 60 mesas: 15 en Terraza, 15 en Salón principal, 15 en Barra y 15 en el Salón Ejecutivo con Gran Vista. En instalaciones existentes se agregan solo las mesas faltantes, sin cambiar IDs ni reservas.

## Acceso Demo

El registro desde la pantalla de acceso solicita nombre, cédula, correo, teléfono y contraseña. La reserva precarga esos datos y, si falta el perfil, ofrece «Registrarse ahora» sin perder mesa, horario ni campos. Este alta rápida requiere una sesión de cliente y permite completar cuentas antiguas. El panel de administración usa `admin@restaurant.com` / `admin123`. En el navegador se deriva la contraseña de cliente con PBKDF2, pero el control de acceso sigue siendo solo demostrativo: cualquier persona que controle el navegador puede modificar LocalStorage. No uses credenciales reales; en producción autentica y autoriza en el servidor.

## Imágenes del menú

Agrega imágenes optimizadas en WebP, con proporción horizontal recomendada 4:3, dentro de:

```text
assets/images/dishes/
├── entradas/
├── principales/
├── pastas/
├── hamburguesas/
├── bebidas/
└── postres/
```

Cada producto guarda `imagen_url` como ruta relativa, por ejemplo `assets/images/dishes/bebidas/Jugo-natural.jpg`. Agrega tus imágenes en las carpetas indicadas por el catálogo. En la administración del menú se puede asignar la ruta y editar el prompt visual. Las rutas relativas funcionan al servir la carpeta desde `localhost` (los módulos ES no cargan desde `file://`).

El catálogo fuente está en `js/catalog.js` y exporta `CATALOGO`: cada elemento incluye `id`, `nombre`, `tipo` cuando aplica, `descripcion`, `precio` (entero en COP), `categoria`, `disponible`, `imagen_prompt` (inglés) e `imagen_url`. Incluye jugos de naranja, mandarina, maracuyá, fresa, mora, mango, lulo y piña, con preparación en agua o leche según corresponda, además de Lager, IPA cítrica, Amber Ale y Stout. Los prompts comparten especificaciones de fotografía comercial, lente de 85 mm, apertura f/2.8, luz lateral suave y fondo cinematográfico oscuro, además de detalles particulares para cada producto.

## Reservas

El flujo incluye turnos de dos horas, anticipo simulado fijo de $50.000 COP, selección obligatoria de método de pago (PSE, Nequi/Daviplata o tarjeta), validación de correo y documento normalizados, cliente único con reserva activa y 30 minutos de gracia desde la hora programada. El bloqueo previo al pago dura tres minutos. Los intervalos son semiabiertos: un turno que acaba a las 15:00 no bloquea el que empieza a las 15:00. El pago y la llegada vuelven a validar los cruces para reducir conflictos entre pestañas. Las mesas ejecutivas tienen un consumo mínimo de $180.000 COP por mesa, deducible de la cuenta y separado del anticipo; el checkout refleja ambos conceptos y el total inicial. El pago es una simulación: no se mueve dinero. El dock «Simulador de tiempo» permite avanzar el reloj o fijar una hora exacta para probar solapamientos, llegadas y liberaciones. Los cambios se guardan en LocalStorage en este navegador.

## Pruebas

`node tests/run.mjs` (Node 20+, sin dependencias) valida las reglas de negocio: disponibilidad y estado de mesas, cliente único por correo/documento, capacidad, método de pago obligatorio y persistido, protección frente a doble pago, pago fallido, vencimiento, llegada, cancelación y ventana configurable.

## Migración a producción

El prototipo persiste en LocalStorage; cada navegador mantiene su propia copia y no ofrece atomicidad entre clientes. Para producción, mover mesas, reservas, pagos y bloqueos a PostgreSQL/Supabase. Guardar `fecha_inicio` y `fecha_fin` como `timestamptz`, proteger las reservas pendientes/confirmadas/en curso con una restricción de exclusión sobre `tstzrange(fecha_inicio, fecha_fin, '[)')` por `mesa_id` (con `btree_gist`) y crear reservas dentro de una transacción del servidor. La llegada debe comprobar el límite de gracia y un job/cron debe expirar no-shows y cerrar turnos vencidos. Crear el intento de pago en el servidor, confirmar el anticipo con webhook firmado de Wompi o PayU y guardar sus referencias e idempotency keys; el consumo mínimo se registra como saldo aplicable a la cuenta final, no como anticipo online.

El pago y el reloj simulado son demostrativos. Para producción se requiere backend, pasarela real y un proceso de expiración del lado del servidor.
