# NUBA — Prototipo móvil de reservas

Proyecto móvil de alta fidelidad para **Deportes, Belleza y Entretenimiento**. Funciona con Live Server y usa `localStorage` para simular cuentas, reservas, carrito, pagos, productos y paneles.

## Abrir
1. Abrir la carpeta en VS Code.
2. Clic derecho en `index.html` → **Open with Live Server**.
3. Ingresar eligiendo **Cliente**, **Proveedor** o **Administrador**.

## Flujo cliente
Inicio → categoría → local → calendario mensual → horario y extras → pago (Yape/Plin/tarjeta) → confirmación → QR → mis reservas.

## Flujo proveedor
Panel → solicitudes → local → disponibilidad → productos con foto/precio/stock → validación QR.

## Flujo administrador
Panel → aprobaciones → negocios → usuarios → reportes.

## Google Maps
`assets/js/maps-config.js` contiene la clave local que se pidió para la demostración. **No suban una clave abierta a GitHub público**: restrínjanla en Google Cloud para `http://127.0.0.1:*`, `http://localhost:*` y su dominio final.

## UX/UI aplicado
- Estado visible: badges, toasts, botones de carga y estados de reserva.
- Prevención de errores: horarios ocupados bloqueados, pago validado antes de QR, campos obligatorios.
- Control del usuario: botones volver, cancelar y administración de reservas.
- Consistencia: mismas medidas de botones, radios y tarjetas.
- Reconocimiento: categorías con imagen, resumen persistente y etiquetas claras.
- Accesibilidad: etiquetas de formularios, contraste, navegación simple y zonas táctiles amplias.


## Respaldo del código de tu compañero
Los HTML que enviaste para `carrito`, `perfil` y `tienda` se guardaron sin borrar en `respaldo_companero/`. La versión activa conserva esos módulos, sus pantallas y funciones, pero usa el diseño unificado y sin emojis.
