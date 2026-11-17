# Portafolio de Marcelo Javier Jaimes

Sitio personal en español e inglés. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4,
shadcn/ui, Magic UI, GSAP, Lenis, HyperFrames y Lucide.

## Verlo en local

```bash
npm install
npm run dev
```

Abre http://localhost:3000. La versión en inglés está en http://localhost:3000/en.

## Editar el contenido

Todo el contenido está en dos archivos; no hace falta tocar componentes.

| Qué | Dónde |
|---|---|
| Proyectos, experiencia, stack, datos de contacto | `lib/content.ts` |
| Textos de botones, títulos y navegación | `lib/i18n.ts` |
| Colores y tipografía | `app/globals.css` (documentados en `DESIGN.md`) |

Para activar el botón "Descargar CV", copia el PDF a `public/` y pon su ruta en `site.cv`
dentro de `lib/content.ts`.

## Video del inicio

El video de fondo se genera con [HyperFrames](https://github.com/heygen-com/hyperframes) a partir de
`reel/index.html` (HTML + GSAP). Requiere Node.js 22 y FFmpeg.

```bash
cd reel
npm run dev      # vista previa
npm run render   # genera el MP4
```

Después se codifica para web y se copia a `public/media/`:

```bash
ffmpeg -i renders/*.mp4 -vf scale=1600:900 -an -c:v libx264 -crf 27 -movflags +faststart ../public/media/hero.mp4
ffmpeg -i renders/*.mp4 -vf scale=1600:900 -an -c:v libvpx-vp9 -crf 38 -b:v 0 ../public/media/hero.webm
```

## Publicación

El sitio se exporta como HTML estático (`npm run build` genera la carpeta `out/`).

- **GitHub Pages:** cada push a `main` lo publica con `.github/workflows/deploy.yml`.
- **Vercel:** importa el repositorio sin configuración adicional y define
  `NEXT_PUBLIC_SITE_URL` con el dominio final.

## Estructura

```
app/(es)        Páginas en español: / y /proyectos/[slug]
app/(en)        Páginas en inglés: /en y /en/projects/[slug]
components/site Secciones del sitio
components/ui   Componentes de shadcn/ui
components/magicui  Componentes de Magic UI
lib             Contenido, textos, SEO y utilidades
```
