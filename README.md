# MESASERVIDA

Panel web estático para reservas y control de sala de un restaurante. Usa HTML, Tailwind por CDN, módulos JavaScript y LocalStorage. Los datos no se comparten entre navegadores y el pago es simulado: no se mueve dinero.

## Ejecutar desde `restaurante/`

Requiere Node.js 20+ para las pruebas. La app no tiene dependencias de npm.

```bash
cd restaurante
python3 -m http.server 8000
```

Abre <http://localhost:8000>. También funciona con Live Server. No abras `index.html` con `file://`: el navegador no carga correctamente los módulos ES de ese modo.

Para validar reglas y cálculos:

```bash
node tests/run.mjs
```

Desde la raíz del repositorio:

```bash
node restaurante/tests/run.mjs
```

## GitHub Pages

Publica la carpeta `restaurante/` con la configuración de GitHub Pages que use el proyecto. El HTML y los recursos usan rutas relativas a esa carpeta; no necesitan una ruta fija del dominio.

## Acceso de demostración

El panel de anfitrión usa `admin@restaurant.com` / `admin123`. El registro de clientes y las reservas se guardan en LocalStorage. Las herramientas de simulación están agrupadas en “Herramientas de demostración”, solo se muestran a administradores y sus operaciones también validan el rol en los servicios. Al entrar un cliente, el reloj vuelve a la hora real. No uses datos ni contraseñas reales: el control de acceso es demostrativo y puede modificarse desde el navegador.

La app precarga 60 mesas distribuidas en Terraza, Salón principal, Barra y Salón Ejecutivo · Gran Vista. El Salón Ejecutivo tiene un consumo mínimo de $180.000 COP por mesa, pagadero en el restaurante y separado del anticipo.

## Imágenes del menú

Las imágenes de carta están dentro de `assets/images/dishes/`, por categoría. Sus nombres están en minúsculas, sin espacios ni tildes; el catálogo de rutas está en `js/catalog.js`. Las imágenes que falten usan otra imagen local de la misma categoría.

## Reservas y pago

Los turnos duran dos horas. El anticipo obligatorio de $50.000 COP y los métodos PSE, Nequi/Daviplata y tarjeta son simulaciones locales; la aplicación lo indica en pantalla y no mueve dinero. El método seleccionado queda guardado en el pago y se muestra en la confirmación. El reloj acelerable y el rechazo forzado del próximo pago están reservados al administrador. La ventana de llegada se configura en el panel; vencida, el prototipo libera la mesa y marca el anticipo como retenido según la política simulada.

Esto no cobra ni retiene fondos y no reemplaza términos de cancelación o reembolso. Para operar con clientes reales hacen falta backend transaccional, pasarela y webhook, autenticación de servidor, protección de datos y política legal revisada.

## Documentación

- [Problema que resuelve](docs/PROBLEMA.md): situación operativa, funciones y antes/después.
- [Modelo de ingresos](docs/INGRESOS.md): fórmulas editables, supuestos, alternativas de negocio y ruta para facturar.
