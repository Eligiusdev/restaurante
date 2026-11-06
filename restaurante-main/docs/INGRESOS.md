# Cómo puede crear ingresos MESASERVIDA

## 1. Ingreso y capacidad recuperada para el restaurante

Las cifras de esta sección son **supuestos a validar con datos reales del restaurante**. No son resultados garantizados ni estadísticas del sector. Ajusta cada variable con el historial del local.

### Fórmula de consumo recuperado

```text
reservas_mes = reservas_semanales × 52 / 12
mesas_recuperadas =
  mínimo(reservas_mes × no_show_actual × reducción_no_show_con_anticipo,
         número_de_mesas × 52 / 12)
consumo_recuperado_mes = mesas_recuperadas × consumo_promedio_por_mesa
consumo_recuperado_año = consumo_recuperado_mes × 12
```

La calculadora limita el escenario a **una mesa recuperada por mesa y semana**, como supuesto conservador editable en el modelo; el restaurante puede ajustar esa capacidad según sus turnos. La reducción del no-show es un supuesto, no un efecto demostrado del anticipo. No cuentes dos veces una misma mesa recuperada como no-show evitado y como reventa automática.

### Ejemplo ilustrativo

Supuestos a validar: 60 mesas; 80 reservas por semana; no-show actual de 15%; reducción del no-show de 50% con anticipo; consumo promedio por mesa de $140.000 COP; anticipo de $50.000 COP.

- Reservas mensuales estimadas: `80 × 52 / 12 = 346,7`.
- No-shows previos estimados: `346,7 × 15% = 52`.
- Mesas recuperadas: `52 × 50% = 26` (por debajo del límite supuesto de 260 al mes).
- **Consumo recuperado ilustrativo:** `26 × $140.000 = $3.640.000 COP al mes`, o **$43.680.000 COP al año**.
- Quedarían 26 no-shows bajo este escenario. Si cada uno pierde el anticipo completo, los **$1.300.000 COP mensuales potencialmente retenidos** se muestran aparte; no están sumados al consumo recuperado. El supuesto exige política clara, cumplimiento legal y consideración de devoluciones y costos de pasarela.

Este ejemplo no descuenta costos de alimentos, impuestos, comisiones, devoluciones ni el hecho de que una mesa vendida puede sustituir otra venta. El consumo no equivale a utilidad.

### Otras fuentes de valor para el restaurante

| Palanca | Fórmula editable o ejemplo | Cómo evitar sobreestimar |
|---|---|---|
| Anticipos retenidos en cancelación tardía o no-show | `casos elegibles × anticipo no reembolsado` | Ingreso directo solo bajo una política visible y válida. Restar devoluciones y cargos de pasarela. |
| Reventa tras liberación automática | `mesas liberadas que se revendieron × consumo promedio` | Contar únicamente mesas que habrían quedado vacías al menos 30 minutos; no duplicar con no-shows evitados. |
| Consumo mínimo en zona premium | Ejemplo actual: Salón Ejecutivo, **$180.000 COP por mesa** | Es un mínimo de consumo en sitio, separado del anticipo y aplicable a la cuenta según las condiciones publicadas. |
| Menos confirmaciones manuales | `minutos ahorrados/semana × costo laboral cargado por hora × 52 / 12 / 60` | Medir el tiempo real antes y después; no asumir que equivale automáticamente a una reducción de nómina. |
| Ocupación en horas valle | `clientes contactados × conversión incremental × consumo promedio` | Separar ventas incrementales de clientes que habrían venido sin oferta y considerar el descuento. Requiere consentimiento para contacto. |

## 2. Cómo puede cobrar el producto

Los siguientes precios y porcentajes son **ejemplos a validar** mediante entrevistas, costos reales y pruebas comerciales. No son tarifas de pasarelas ni precios publicados por ellas.

| Plan ilustrativo | Precio mensual a validar | Alcance que se podría incluir | Pros | Contras |
|---|---:|---|---|---|
| Básico | $149.000 COP | Una sede, plano, reservas e historial básico | Fácil de explicar y probar para un restaurante pequeño | El margen puede ser limitado si requiere mucho soporte |
| Pro | $299.000 COP | Una sede, reportes, recordatorios y herramientas de fidelización | Ingreso recurrente y mejor alineación con el valor operativo | Requiere que el restaurante use las funciones para percibir el valor |
| Multisede | $699.000 COP | Hasta tres sedes y reportes consolidados | Más ingreso por cuenta y control central | Implementación e integraciones de mayor costo |

**Suscripción mensual.** Pros: ingreso predecible, cobro sencillo y el restaurante no paga más cuando sus reservas crecen. Contras: debe demostrar valor mes a mes y puede ser difícil de vender a locales con bajo volumen.

**Comisión sobre anticipos.** Como escenario para probar, podría cobrarse una comisión de producto de **0,5% a 1,0%** además del costo real de la pasarela (Wompi, PayU o Mercado Pago, según negociación y disponibilidad). Pros: acompaña el volumen y reduce la barrera de un fijo alto. Contras: el costo total puede ser poco claro, depende de devoluciones y conciliación, y requiere mostrar por separado el cargo de la plataforma y el de la pasarela. No publicar ni activar porcentajes hasta confirmar las tarifas vigentes del proveedor.

**Servicios adicionales.** Recordatorios por WhatsApp, reportes avanzados e integración con caja/POS podrían venderse como complementos o planes superiores. Ventaja: se cobra por necesidades concretas. Riesgo: hay costos de proveedor, soporte, consentimiento y mantenimiento que se deben cubrir.

**Configuración inicial.** Un cobro único ilustrativo de **$350.000 COP (a validar)** podría cubrir carga de mesas, horarios y capacitación. Reduce el costo de puesta en marcha para el producto, pero agrega fricción de entrada; también se puede bonificar con permanencia o planes anuales, después de calcular el costo real de implementación.

### Punto de equilibrio: ejemplo editable

Supuestos a validar: costos fijos mensuales de hosting de $600.000 COP y soporte de $1.200.000 COP; contribución neta promedio por restaurante de $299.000 COP al mes antes de impuestos y costos variables.

```text
restaurantes_para_equilibrio =
  techo((hosting_mensual + soporte_mensual) /
        (ingreso_mensual_por_restaurante - costo_variable_por_restaurante))
```

Con costo variable supuesto de $0 en este ejemplo simplificado: `techo(($600.000 + $1.200.000) / $299.000) = 7 restaurantes`. No incluye pasarela, mensajería, impuestos, ventas, desarrollo ni soporte variable; el punto real será mayor cuando se midan esos costos.

### Recomendación para empezar

Probar una **suscripción mensual por sede**, con Básico y Pro, sin comisión adicional por anticipo durante el piloto. Es más fácil comunicar el precio y separar el software del dinero del cliente. Cobrar el costo real de la pasarela al comercio solo después de integrarla, acordar cómo aparecen los cargos y probar conciliación y reembolsos. Ofrecer configuración inicial como concepto transparente o bonificarla durante una prueba con alcance acordado.

## 3. Qué falta para facturar de verdad

Prioridad antes de operar con reservas y pagos reales:

1. **Backend con transacciones atómicas** para reservar, pagar y liberar mesas; no usar LocalStorage como fuente compartida.
2. **Restricción única en base de datos** para impedir cruces de turnos por mesa y reservas activas duplicadas por cliente.
3. **Pasarela real y webhook firmado** (Wompi, PayU o Mercado Pago), idempotencia, conciliación y flujo de reembolso. El pago actual es simulado: no mueve dinero.
4. **Autenticación y roles en servidor**, autorización por restaurante/sede y auditoría; las credenciales de demostración no protegen datos.
5. **Tiempo real con Supabase** u otro servicio, con reglas de acceso por fila y manejo de reconexión.
6. **Términos y política de cancelación/reembolso** claros antes de reservar, incluyendo cuándo el anticipo se devuelve o se retiene.
7. **Tratamiento de datos personales conforme a la Ley 1581 de 2012 en Colombia**: finalidades, autorización, derechos de titulares, retención, seguridad y procedimiento para consultas o reclamos.

Hasta completar esas tareas, MESASERVIDA sirve para evaluar un flujo de trabajo y supuestos; no para cobrar anticipos ni alojar datos reales de clientes.
