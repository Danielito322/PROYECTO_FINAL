# NUBA — Plataforma modular de reservas

Prototipo web móvil para reservar espacios, servicios y experiencias. El proyecto inicia con canchas, restaurantes, belleza y entretenimiento; la estructura permite agregar nuevos rubros sin cambiar la base.

## Ejecutar

1. Abrir la carpeta con Visual Studio Code.
2. Abrir `index.html`.
3. Clic derecho → **Open with Live Server**.

No necesita Node.js, npm, React ni base de datos. Los datos se simulan en `assets/js/data.js` y se guardan temporalmente en el navegador con `localStorage`.

## Estructura

```text
NUBA_Reservas_Modular_GitHub/
├── index.html
├── pages/                 # Pantallas separadas
├── assets/css/            # Estilos globales y de pantallas
├── assets/js/             # Lógica modular por pantalla
├── docs/                  # Guías de equipo y GitHub
└── scripts/               # Scripts de apoyo para Git
```

## Trabajo por módulos

- **Daniel:** `index.html`, `pages/explorar.html`, `pages/mapa.html`, `assets/js/home.js`, `assets/js/explore.js`.
- **Adriano:** `pages/detalle.html`, `pages/reservar.html`, `pages/pago.html`, `pages/confirmacion.html`, `assets/js/detail.js`, `assets/js/reservation.js`, `assets/js/payment.js`, `assets/js/confirmation.js`.
- **Fernando:** `pages/tienda.html`, `pages/carrito.html`, `pages/mis-reservas.html`, `pages/perfil.html`, `pages/negocio.html`, y sus JavaScript asociados.
- **Archivos compartidos:** `assets/css/base.css`, `assets/css/components.css`, `assets/js/config.js`, `assets/js/data.js`, `assets/js/storage.js`, `assets/js/app-shell.js`. Coordinen antes de cambiarlos.

## Cambiar el nombre de la app

Solo editar esta línea en `assets/js/config.js`:

```js
name: 'NUBA'
```

## GitHub

La guía exacta está en [`docs/GUIA_GITHUB.md`](docs/GUIA_GITHUB.md).
