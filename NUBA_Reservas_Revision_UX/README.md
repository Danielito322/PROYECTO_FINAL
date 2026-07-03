# NUBA · Prototipo móvil de reservas

Prototipo de alta fidelidad para una plataforma de reservas de **Deportes, Belleza y Entretenimiento** en Puno. Está preparado para abrirse con **Live Server** desde `index.html`.

## Qué se corrigió en esta revisión

- El mapa ya no se queda en una vista vacía al cambiar entre categorías: vuelve a dibujar los marcadores de **Deportes**, **Belleza** y **Entretenimiento**. Cuando Google Maps no puede cargar, conserva un mapa demostrativo filtrable.
- Los cuadros de pago, productos y confirmación quedan centrados dentro del marco móvil; ya no aparecen en el lado izquierdo del navegador.
- Se aumentó el espacio inferior de las pantallas para que los botones fijos de reserva no cubran texto, productos ni acciones.
- Diseño móvil con fondo fotográfico, transparencia, desenfoque, degradados y botones consistentes. Los iconos son SVG, no emojis.
- Calendario mensual con navegación de hasta tres meses, horarios por mañana/tarde/noche y horas bloqueadas.
- Flujo de reserva: local → fecha/hora → extras → Yape/Plin/tarjeta → confirmación de pago → QR.
- Tienda por local: el proveedor puede agregar imagen, nombre, descripción, precio y stock. Los productos se muestran en la tienda de Arena Sur para la demostración.
- Se agregó sistema de reseñas, respuestas del proveedor y moderación del administrador.

## Páginas nuevas

- `pages/resenas.html`: el cliente ve y publica reseñas de un local.
- `pages/proveedor-resenas.html`: el proveedor responde y reporta comentarios.
- `pages/admin-resenas.html`: el administrador publica u oculta reseñas reportadas.

## Roles

- **Cliente:** explora, reserva, paga, recibe QR, compra productos y califica.
- **Proveedor:** administra local, horarios, reservas, productos, stock, QR y reseñas.
- **Administrador:** aprueba negocios, gestiona usuarios, reportes y moderación de reseñas.

## Google Maps

La configuración está en `assets/js/config.js` y `assets/js/maps-config.js`.

Para que el mapa real aparezca, la clave debe tener habilitada **Maps JavaScript API** y permitir la URL que use Live Server, por ejemplo `http://127.0.0.1:*` o `http://localhost:*`.

## Uso

1. Descomprime este proyecto.
2. Abre la carpeta en VS Code.
3. Clic derecho en `index.html` → **Open with Live Server**.
4. Prueba los tres roles desde la pantalla de inicio de sesión.

## Nota de trabajo en equipo

Mantiene las páginas originales del proyecto y agrega módulos sin borrar los existentes. Para publicar los cambios en GitHub, trabajen en una rama y revisen antes de unirla a `main`.
