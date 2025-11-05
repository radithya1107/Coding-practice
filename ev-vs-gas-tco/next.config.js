/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // If your repo name is not the root, set basePath
  // basePath: '/ev-vs-gas-tco',
  // trailingSlash: true,
};

module.exports = nextConfig;

