# DESIGN.md

Identidad visual del portafolio de Marcelo Javier Jaimes. Es la referencia para cualquier cambio.

## Concepto

**Negro con luz.** Fondo casi negro, superficies de vidrio y tres fuentes de luz (violeta, cian y
magenta) que aparecen en la esfera 3D del inicio, en los bordes de las tarjetas y en los títulos.
El contenido es sobrio y verificable; el brillo está en la forma, no en el texto.

## Color

| Token | Oscuro | Claro | Uso |
|---|---|---|---|
| `background` | `#050507` | `#F5F5F8` | Fondo de página |
| `foreground` | `#EDEDF0` | `#0B0B10` | Texto principal |
| `card` | blanco al 4 % | blanco al 70 % | Superficie de vidrio (`glass`) |
| `card-solid` | `#0C0C11` | `#FFFFFF` | Tarjetas que tapan lo que hay detrás |
| `muted-foreground` | `#8F919D` | `#5B5D6B` | Texto secundario |
| `border` | blanco al 10 % | negro al 12 % | Bordes |
| `glow-a` | `#7C5CFF` violeta | `#6A4DFF` | Luz principal |
| `glow-b` | `#3DDCFF` cian | `#12A8DC` | Luz secundaria |
| `glow-c` | `#FF5CAA` magenta | `#E63B8F` | Luz de acento |
| `line-backend` | `#9B85FF` | `#5B3DF5` | Área Backend |
| `line-mobile` | `#FF7DBB` | `#D6257F` | Área Móvil y frontend |
| `line-data` | `#4FE0B0` | `#0A8F63` | Área ERP y datos |
| `line-infra` | `#5CCFFF` | `#0B7FC4` | Área Infraestructura |

Reglas:

- Cada área de trabajo tiene un color y cada proyecto toma el de su área principal.
- El degradado de tres luces (`text-glow`) se reserva para el título de contacto y el de cada caso.
- El botón principal es blanco sobre negro (negro sobre blanco en modo claro), nunca de color.

## Tipografía

| Familia | Uso |
|---|---|
| **Geist** (variable) | Títulos (peso 600, interletrado de -0.04em) y texto corrido (17 px, 1.6) |
| **Geist Mono** (variable) | Etiquetas, fechas, tecnologías y el correo (`label-mono`) |

Ambas se autoalojan con `@fontsource-variable`. Mayúscula solo inicial.

## Forma

- Tarjetas con radio de 24 a 36 px; botones y navegación en forma de píldora.
- Navegación flotante de vidrio, centrada.
- Utilidad `glass`: borde fino, fondo translúcido, desenfoque de 18 px y un filo de luz arriba.
- Ancho máximo de contenido: 72 rem.

## Movimiento

| Dónde | Qué | Con qué |
|---|---|---|
| Inicio | Esfera líquida 3D que respira y sigue al puntero | three.js (shader propio) |
| Inicio | Aurora de fondo y titular que entra palabra por palabra | CSS + GSAP SplitText |
| Inicio | Texto con destello en la píldora y cinta de tecnologías | Magic UI `animated-shiny-text`, `marquee` |
| Toda la página | Scroll suave | Lenis + GSAP ScrollTrigger |
| Proyectos | Las tarjetas se apilan: la anterior se encoge y se apaga | GSAP ScrollTrigger (scrub) |
| Proyectos | Haz de luz en el borde y una luz que baja por el recorrido del dato | Magic UI `border-beam` + CSS |
| Sobre mí | Las palabras se encienden con el scroll; reloj con la hora de La Paz | GSAP SplitText |
| Stack | La tarjeta se ilumina bajo el puntero con el color de su área | Magic UI `magic-card` |
| Experiencia | Línea de luz que se llena con el scroll | GSAP ScrollTrigger (scrub) |
| Botones | Se atraen hacia el puntero | GSAP quickTo |
| Cambio de tema | Revelado circular desde el botón | Magic UI `animated-theme-toggler` |

Reglas:

- Todo respeta `prefers-reduced-motion`: la esfera se dibuja una vez y queda quieta.
- three.js se carga aparte, después de la primera pintura, y se pausa cuando el inicio sale de pantalla.
- El contenido nunca depende de JavaScript ni de WebGL para ser visible.

## Voz

- Primera persona, frases cortas, sin adjetivos de venta.
- Cada tecnología va junto al lugar donde se usó. Sin cifras inventadas.
- Los proyectos de empresa van sin nombre, sin capturas y sin repositorio.

## Accesibilidad

- Contraste AA en texto. Foco visible en todo elemento interactivo. Áreas táctiles de 44 px.
- Probado en 390 y 1440 px.
