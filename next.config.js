/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true
  },
  images: {
    domains: ['cdn.discordapp.com']
  }
}

module.exports = nextConfig