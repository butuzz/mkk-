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

module.exports = withPWA(nextConfig)
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  pwa: {
    dest: 'public', // Папка для хранения сервис-воркера
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/.*\.(js|css|html|json)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'static-resources',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 30, // Кэшируем на 30 дней
          },
        },
      },
    ],
  },
});
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}