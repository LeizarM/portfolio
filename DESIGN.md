# DESIGN.md

Identidad visual del portafolio de Marcelo Javier Jaimes. Este documento es la referencia para
cualquier cambio: si algo nuevo no encaja aquí, primero se discute el documento y después el código.

## Concepto

**Copia carbón.** Marcelo construye y opera el software de empresas de distribución: facturas, notas de
entrega, kardex. El sitio toma su lenguaje visual de ese mundo y no de una plantilla de portafolio.

- Modo oscuro: la hoja de papel carbón, un índigo profundo (no negro).
- Modo claro: tinta índigo sobre papel bond.
- Acentos: los colores de las copias de una factura (canario, rosa, menta, celeste).

**El elemento memorable es uno solo:** el mapa de líneas del inicio. Cada línea es un área de trabajo y
cada estación es un proyecto donde esas áreas se cruzan. Todo lo demás es sobrio a propósito.

## Color

| Token | Oscuro | Claro | Uso |
|---|---|---|---|
| `background` | `#13142B` carbón | `#FAFAF7` bond | Fondo de página |
| `foreground` | `#F1EEE4` bond | `#1B1D4D` tinta | Texto principal |
| `card` | `#1B1D3D` | `#FFFFFF` | Tarjetas de proyecto |
| `muted-foreground` | `#A9A8C4` | `#55577E` | Texto secundario |
| `border` | `#2F3262` | `#D6D7E3` | Divisores y bordes |
| `primary` | `#F4D35E` canario | `#1B1D4D` tinta | Acción principal |
| `line-backend` | `#F4D35E` canario | `#A67C00` | Línea Backend |
| `line-mobile` | `#F29CB7` rosa | `#C2386A` | Línea Móvil y frontend |
| `line-data` | `#8FD6B4` menta | `#1F7A55` | Línea ERP y datos |
| `line-infra` | `#8DB8F2` celeste | `#2B5FC2` | Línea Infraestructura |

Reglas:

- Los cuatro colores de línea **significan** un área. No se usan como decoración ni para otra cosa.
- En modo claro los colores de línea se oscurecen para mantener contraste sobre papel.
- No hay degradados de fondo, sombras difusas ni efectos de vidrio.

## Tipografía

Una sola familia: **Archivo** (variable, autoalojada con `@fontsource-variable/archivo`), de la
fundidora latinoamericana Omnibus-Type. El recurso expresivo es el **ancho** de la letra:

| Utilidad | Ancho | Peso | Uso |
|---|---|---|---|
| `type-wide` | 125 % | 800 | Nombre, título de contacto, título de cada caso |
| `type-semiwide` | 112 % | 800 | Títulos de sección y de tarjeta |
| (normal) | 100 % | 400–700 | Texto corrido, 17 px, interlineado 1.6 |
| `type-narrow` | 72 % | 600 | Datos: fechas, tipo de proyecto, leyendas |

Reglas:

- Mayúscula solo inicial. Nada de rótulos en mayúsculas sostenidas.
- Líneas de texto de 46 a 66 caracteres.
- No se usa una segunda familia ni monoespaciada para etiquetas.

## Forma y espacio

- Radio base de 8 px en botones y tarjetas. Las estaciones y las píldoras de línea son círculos.
- Ancho máximo de contenido: 72 rem (`max-w-6xl`). Alineación a la izquierda en todo el sitio.
- Las secciones se separan con una línea de 1 px y 5–7 rem de aire, no con fondos alternos.
- Motivo recurrente: la **estación** (círculo con borde grueso y centro del color del fondo). Aparece
  en el mapa, en el stack, en la línea de tiempo y en las listas de los casos.

## Movimiento

| Dónde | Qué | Con qué |
|---|---|---|
| Inicio | Las líneas del mapa se trazan una vez al cargar | GSAP (timeline) |
| Stack | Cada línea se extiende al entrar en pantalla | GSAP ScrollTrigger |
| Experiencia | La línea de tiempo se llena con el scroll | GSAP ScrollTrigger (scrub) |
| Proyecto destacado | Un haz recorre el borde de la tarjeta | Magic UI `border-beam` |
| Fuera de horario | Cinta de herramientas | Magic UI `marquee` |
| Páginas de caso | Entrada del encabezado | Magic UI `blur-fade` |
| Cambio de tema | Revelado circular desde el botón | Magic UI `animated-theme-toggler` |

Reglas:

- No hay aparecer-y-deslizar en cada sección. Una animación orquestada por página.
- Todo respeta `prefers-reduced-motion`: sin movimiento, el sitio se muestra en su estado final.
- El contenido nunca depende de JavaScript para ser visible.

## Voz

- Primera persona, frases cortas, sin adjetivos de venta ("apasionado", "experto", "senior").
- Cada tecnología va junto al lugar donde se usó. Si no hay dónde, no se lista.
- Sin cifras inventadas. Si un dato no se puede respaldar, se describe el hecho.
- Los proyectos de empresa van sin nombre, sin capturas y sin repositorio.

## Accesibilidad

- Contraste AA en texto. Foco visible de 2 px en todo elemento interactivo.
- Áreas táctiles de 44 px como mínimo.
- El mapa tiene título y descripción, y en móvil las estaciones se repiten como lista de enlaces.
- Probado en 390, 768, 1024 y 1440 px.
