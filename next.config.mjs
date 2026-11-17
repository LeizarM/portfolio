/**
 * Exportación estática. En GitHub Pages el sitio vive en /portfolio, así que el
 * workflow define NEXT_PUBLIC_BASE_PATH=/portfolio. En local o en Vercel queda vacío.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
