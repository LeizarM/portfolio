const path = require('path');

// Variable para saber si estamos construyendo para producción (GitHub Pages)
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let repo = '';
if (isGithubActions) {
  const repoName = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '');
  repo = `/${repoName}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  output: 'export',
  basePath: '/portfolio', 
  assetPrefix: '/portfolio/',
  
  
  distDir: process.env.NEXT_DIST_DIR || '.next',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../'),
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: { 
    unoptimized: true 
  },
};

module.exports = nextConfig;