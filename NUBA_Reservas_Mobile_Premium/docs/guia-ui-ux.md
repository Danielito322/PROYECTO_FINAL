# Guía de Principios de Diseño UI/UX · NUBA

Esta guía establece los principios de diseño de Interfaz de Usuario (UI) y de Experiencia de Usuario (UX) para **NUBA**, una aplicación web móvil premium de reservas de deportes, belleza y entretenimiento en Puno.

---

## 1. Identidad Visual y Estética Premium

NUBA adopta un enfoque visual sofisticado basado en el **Modo Oscuro** y el **Glassmorphism** para transmitir exclusividad y modernidad.

### 1.1 Paleta de Colores (Diseño HSL y Variables CSS)
El tema de color utiliza un fondo oscuro profundo con acentos vibrantes inspirados en neón para guiar la atención del usuario:

- **Fondo Principal (`--bg`)**: `#0a1018` (Azul oscuro profundo. Reduce la fatiga visual y ahorra batería en pantallas OLED).
- **Superficie Flotante (`--surface`)**: `rgba(21, 30, 43, 0.78)` (Caja base del glassmorphism).
- **Bordes/Líneas (`--line`)**: `rgba(255, 255, 255, 0.11)` (Líneas finas semi-transparentes para separar elementos sin sobrecargar visualmente).
- **Colores de Acento (Gradientes y Chips)**:
  - **Violeta (`--violet`)**: `#8a7cff` (Acento principal, usado en botones primarios).
  - **Cian (`--cyan`)**: `#4ed6ff` (Sub-acento e información secundaria).
  - **Menta (`--mint`)**: `#56edb1` (Estados de éxito o confirmación).
  - **Pink (`--pink`)** / **Amber (`--amber`)**: Colores secundarios para categorías y estados.

### 1.2 Tipografía
- Se utiliza la tipografía **Inter** (o sans-serif del sistema) con grosores marcados (`font-weight: 850` para encabezados y `font-weight: 950` para elementos críticos) para crear un fuerte contraste de jerarquía tipográfica.
- **Tamaños recomendados**:
  - Títulos principales (`h1`): `27px` a `31px` (con interlineado compacto de `1.05` y espaciado de letras ajustado `-0.8px`).
  - Títulos de sección (`h3`): `16px`.
  - Texto de lectura: `12px` - `13px`.
  - Etiquetas auxiliares: `10px` (nunca menos de `9px` para garantizar la legibilidad en pantallas pequeñas).

---

## 2. Componentes de Interfaz y Micro-interacciones

El diseño de componentes en NUBA debe sentirse interactivo, responsivo y "vivo".

### 2.1 El Shell de Aplicación Móvil
- **Contenedor Limitado**: La clase `.app-shell` limita el ancho de la aplicación a `min(100%, 480px)`. Esto asegura que la experiencia se visualice como un smartphone nativo incluso en pantallas de escritorio, centrando la atención en el contenido.
- **Barras de Navegación fijas**: El encabezado `.topbar` y la navegación inferior `.app-nav` permanecen fijos para que el usuario no pierda el contexto de navegación al hacer scroll.

### 2.2 Glassmorphism (Efecto Cristal)
Para lograr el efecto translúcido premium:
- Usa `backdrop-filter: blur(16px)` o `blur(24px)` para desenfocar lo que está detrás.
- Aplica un borde sutil semi-transparente (`border: 1px solid var(--line)`).
- Añade una sombra suave difuminada (`box-shadow: 0 11px 25px rgba(0, 0, 0, 0.12)`) para dar elevación física y jerarquía.

### 2.3 Micro-animaciones y Estados Interactivos
- **Botones (`.primary-btn`, `.secondary-btn`)**:
  - Al hacer hover o tap: `transform: translateY(-2px)` y aumentar el brillo (`filter: brightness(1.08)`).
  - Transición suave con `transition: 0.2s transform, 0.2s filter`.
- **Tarjetas de Categoría (`.category-card`)**:
  - Al pasar el cursor o pulsar: Escalado sutil hacia arriba y cambio de color del borde a la variable correspondiente (`border-color: rgba(169, 153, 255, 0.52)`).

---

## 3. Patrones de UX para Flujos de Reserva

### 3.1 Flujo de Selección de Fecha y Hora (Reserva)
- **Tira de Días (`.week-strip`)**:
  - Presenta los 7 días de la semana de forma horizontal. El día activo debe destacar con un gradiente violeta/cian y borde brillante.
- **Malla de Horas (`.time-grid`)**:
  - Clasificar las horas en 3 estados claros mediante el uso de clases en los botones:
    1. **Disponibles**: Color de texto brillante y borde sutil.
    2. **Ocupadas (`.busy`)**: Opacidad reducida (`0.34`), texto tachado (`text-decoration: line-through`) y cursor bloqueado (`cursor: not-allowed`).
    3. **Seleccionada (`.selected`)**: Color de fondo verde menta suave (`rgba(86, 237, 177, 0.16)`), borde menta y texto menta.

### 3.2 Proceso de Pago Digital
- **Selección de Método (`.payment-method`)**:
  - En lugar de botones de radio genéricos, el método seleccionado debe iluminar toda su caja con un borde cian y fondo suave para mejorar el área táctil de selección (Touch Target).
- **Desglose de Precios (`.summary-card`)**:
  - Las filas deben alinearse a los extremos (conceptos a la izquierda, precios a la derecha).
  - El total debe ir separado por una línea discontinua (`border-top: 1px dashed var(--line)`) y en negrita prominente.

### 3.3 Confirmación QR
- **Validación Visual de Éxito**: Un anillo verde menta (`.success-ring`) con el icono de check central para dar confirmación instantánea.
- **Contraste del QR**: La caja del QR (`.qr-box`) debe tener un fondo blanco puro (`#fff`) para asegurar que los escáneres ópticos lean correctamente los patrones oscuros en cualquier condición de iluminación del local.

---

## 4. Accesibilidad (A11y) y Buenas Prácticas Móviles

1. **Tamaño de Zonas Táctiles**: Los botones y enlaces interactivos deben tener un área mínima de `44px x 44px` (directrices de Apple y Google) para evitar pulsaciones erróneas en pantallas táctiles.
2. **Zonas Seguras (Safe Areas)**: Asegurar que los componentes inferiores (como la barra de navegación `.app-nav`) incluyan la propiedad `env(safe-area-inset-bottom)` en el padding para evitar superponerse con las barras de gestos de los dispositivos móviles modernos (iOS y Android).
3. **Contraste Tipográfico**: Asegurarse de que el texto secundario o silenciado (`.muted`, `.muted-2`) no sea excesivamente oscuro sobre el fondo negro para garantizar que personas con dificultades visuales puedan leerlo.
