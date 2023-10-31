const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['cdn.discordapp.com'],
  },
});

module.exports = nextConfig;
