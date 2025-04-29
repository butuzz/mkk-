/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
};

module.exports = nextConfig;
const withPWA = require('next-pwa');
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public',
  },
};

module.exports = withPWA(nextConfig);