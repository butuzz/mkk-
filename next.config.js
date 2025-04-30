/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/mkk-' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mkk-/' : '',
};
module.exports = nextConfig;