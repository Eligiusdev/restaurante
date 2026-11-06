# MESASERVIDA

Panel web estático para reservas y control de sala de un restaurante. Usa HTML, Tailwind por CDN, módulos JavaScript y LocalStorage. Los datos no se comparten entre navegadores y el pago es simulado: no se mueve dinero.

## Ejecutar desde `restaurante-main/`

Requiere Node.js 20+ para las pruebas. La app no tiene dependencias de npm.

```bash
cd restaurante-main
python3 -m http.server 8000
```

Abre <http://localhost:8000>. También funciona con Live Server. No abras `index.html` con `file://`: el navegador no carga correctamente los módulos ES de ese modo.

Para validar reglas y cálculos:

```bash
node tests/run.mjs
```

Desde la raíz del repositorio:

```bash
node restaurante-main/tests/run.mjs
```

## GitHub Pages

Publica la rama/carpeta configurada en GitHub Pages y conserva el directorio `restaurante-main/`. Para este repositorio de proyecto, la ruta esperada es:

`https://eligiusdev.github.io/restaurante/restaurante-main/`

El HTML y los recursos usan rutas relativas a `restaurante-main/`; no necesitan una ruta fija del dominio.

## Acceso de demostración

El panel de anfitrión usa `admin@restaurant.com` / `admin123`. El registro de clientes y las reservas se guardan en LocalStorage. No uses datos ni contraseñas reales: el control de acceso es demostrativo y puede modificarse desde el navegador.

La app precarga 60 mesas distribuidas en Terraza, Salón principal, Barra y Salón Ejecutivo · Gran Vista. El Salón Ejecutivo tiene un consumo mínimo de $180.000 COP por mesa, pagadero en el restaurante y separado del anticipo.

## Imágenes del menú

Las imágenes de carta están dentro de `assets/images/dishes/`, por categoría. Sus nombres están en minúsculas, sin espacios ni tildes; el catálogo de rutas está en `js/catalog.js`. Las imágenes que falten usan otra imagen local de la misma categoría.

## Reservas y pago

Los turnos duran dos horas. El anticipo obligatorio de $50.000 COP, los métodos PSE, Nequi/Daviplata y tarjeta, y el reloj acelerable son simulaciones locales. El método seleccionado queda guardado en el pago y se muestra en la confirmación. La ventana de llegada se configura en el panel; vencida, el prototipo libera la mesa y marca el anticipo como retenido según la política simulada.

Esto no cobra ni retiene fondos y no reemplaza términos de cancelación o reembolso. Para operar con clientes reales hacen falta backend transaccional, pasarela y webhook, autenticación de servidor, protección de datos y política legal revisada.

## Documentación

- [Problema que resuelve](docs/PROBLEMA.md): situación operativa, funciones y antes/después.
- [Modelo de ingresos](docs/INGRESOS.md): fórmulas editables, supuestos, alternativas de negocio y ruta para facturar.
