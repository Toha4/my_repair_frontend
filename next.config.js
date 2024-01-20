/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',

  // Для обхода блокировки CORS на production используется proxy
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*',
      },
    ]
  },
}

const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate(nextConfig)

