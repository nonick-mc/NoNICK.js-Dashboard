/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },
  reactStrictMode: false,
  images: {
    domains: ['cdn.discordapp.com']
  }  
}

module.exports = nextConfig
