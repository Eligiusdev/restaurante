# El problema que resuelve MESASERVIDA

## Una noche de servicio en un restaurante mediano

En muchos restaurantes medianos de Colombia, las reservas llegan por WhatsApp, llamadas e Instagram. El equipo las anota en cuadernos o grupos de chat. Cuando el turno se llena, una conversación que nadie vio puede convertirse en una reserva perdida o duplicada.

Si un cliente no llega, la mesa puede quedarse vacía durante la hora pico sin que exista un compromiso previo. El anfitrión tampoco siempre tiene una vista actualizada de qué mesas están libres, cuáles tienen reserva, quién ya llegó o a qué hora termina cada turno.

Entre servicios, el personal confirma, reprograma y responde preguntas repetidas por varios canales. Y cuando vuelve un cliente, no necesariamente queda a mano su historial de visitas, consumo o cancelaciones.

## Qué aporta el prototipo

| Dificultad del servicio | Función de MESASERVIDA | Alcance actual |
|---|---|---|
| Reservas repartidas entre chats, llamadas y cuadernos | Panel de reservas con cliente, mesa, horario y estado en una sola vista | Datos locales en el navegador; no integra WhatsApp ni Instagram |
| No-shows en hora pico | Anticipo obligatorio de $50.000 COP como señal de compromiso | Pago simulado; no se cobra ni se retiene dinero |
| Una mesa que sigue bloqueada cuando vence la espera | Temporizador de llegada y liberación de la reserva vencida | El reloj y la liberación funcionan en la demostración local |
| Una persona que ocupa varios horarios | Una reserva activa por correo o documento | Validación local; no es una restricción compartida entre dispositivos |
| Falta de visibilidad de la sala y cruces de turnos | Plano con estado, capacidad y filtros; turnos de dos horas sin cruces por mesa | Se actualiza en este navegador, no en tiempo real entre dispositivos |
| Trabajo repetido del anfitrión | Panel para consultar reservas, registrar llegada, cancelar y finalizar el turno | No envía recordatorios automáticos |
| No se conoce a quien vuelve | Base de clientes e historial de reservas | El historial es local y no calcula consumo final ni margen |

El anticipo no elimina por sí solo los no-shows. La política de cancelación y reembolso debe ser explícita antes de reservar, y cualquier cobro real requiere una pasarela, backend, trazabilidad y revisión legal.

## Un viernes, antes y después

**Antes, 7:00 p. m.** Una reserva se quedó en un chat de Instagram y la mesa 12 sigue vacía. El equipo no encuentra el nombre ni sabe si esperar. La siguiente familia ya pregunta por un puesto.

**Con MESASERVIDA, mismo viernes.** A las 6:15 p. m. el turno queda registrado; a las 7:00 p. m. el anfitrión registra “Llegó el comensal”; a las 9:00 p. m., al finalizar el turno, la mesa queda disponible para el siguiente servicio. El panel hace visible la secuencia, pero el resultado depende de que el equipo registre cada acción. En esta versión el pago es simulado y los datos viven en el navegador.
