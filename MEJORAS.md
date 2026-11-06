# Mejoras y evolución de MESASERVIDA

## Entregado en esta versión

| Mejora | Estado | Alcance |
|---|---|---|
| Checkout con método obligatorio, guardado en el pago y visible en confirmación/detalle | Implementada | PSE, Nequi/Daviplata y tarjeta son opciones simuladas; el botón muestra carga y el resultado. |
| Bloqueo de pago de tres minutos, prevención de doble envío y mensajes de disponibilidad | Implementada | Incluye pruebas de método requerido, doble pago y estados de mesa. |
| Plano responsive de mesas por estado y capacidad | Implementada | SVG con sillas, formas por capacidad, anillo de reserva, filtros y zonas plegables en móvil. |
| Rediseño editorial cálido | Implementada | Fraunces y DM Sans, superficies sin glass, estados terrenales, texturas discretas y favicon propio. |
| Dashboard con ocupación protagonista, dona SVG y agenda | Implementada | Las métricas se calculan desde el LocalStorage de este navegador, no desde una sincronización en tiempo real. |
| Foco visible, contraste y controles táctiles | Implementada parcialmente | Se ajustaron estados, formularios y navegación; falta auditoría completa con lectores de pantalla. |
| Menú con imágenes locales 4:3 y archivos normalizados | Implementada | Rutas relativas y fallbacks locales; imágenes derivadas pendientes deben agregarse al catálogo para mostrarse. |
| Pantalla del problema y calculadora de recuperación | Implementada | Los importes son escenarios basados en supuestos editables, no resultados garantizados. |
| Documentación de problema y modelo de ingresos | Implementada | Ver `docs/PROBLEMA.md` y `docs/INGRESOS.md`. |

## Próximas mejoras priorizadas

| Prioridad | Mejora | Impacto | Esfuerzo | Estado / notas |
|---|---|---:|---:|---|
| P0 | Autenticación y roles validados en servidor; restricción única para reservas activas y transacción atómica de reserva | Muy alto | Alto | Pendiente. LocalStorage es manipulable y no puede garantizar unicidad ni atomicidad. |
| P0 | Pasarela real (Wompi o PayU), webhook firmado, idempotencia y reembolsos reales | Muy alto | Alto | Pendiente. El pago actual es simulado y no debe usarse para cobrar. |
| P1 | Recordatorio por correo o WhatsApp antes del vencimiento | Alto | Medio | Pendiente; requiere backend, consentimiento, proveedor y proceso programado. |
| P1 | Sincronización en tiempo real con Supabase Realtime entre dispositivos | Alto | Alto | Pendiente. LocalStorage no sincroniza datos entre navegadores ni dispositivos. |
| P1 | Auditoría completa de accesibilidad con lectores de pantalla y pruebas WCAG automatizadas/manuales | Alto | Medio | Parcial: hay foco visible, teclado y etiquetas; falta revisar todos los recorridos con tecnologías de asistencia. |
| P2 | Lista de espera por mesa y horario | Medio | Medio | Pendiente; conviene apoyarla en disponibilidad transaccional del servidor. |
| P2 | División de cuenta y pedidos desde la mesa mediante QR | Medio | Alto | Pendiente; requiere modelo de pedidos, permisos y conciliación con la cuenta del turno. |
| P2 | Modo claro opcional e internacionalización | Medio | Medio | Pendiente; definir tokens alternos y catálogos de traducción antes de ampliar idiomas. |
| P2 | Tendencias históricas de ventas y ocupación | Medio | Medio | Pendiente; guardar eventos o agregados fechados. La tarjeta de 24 horas actual cuenta reservas, no snapshots históricos. |

## Nota de persistencia

La demostración guarda cambios en LocalStorage del navegador actual. No ofrece sincronización entre dispositivos, control de acceso seguro, consistencia transaccional ni respaldo del servidor.
