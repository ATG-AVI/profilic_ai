/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/analyze',
        destination: 'http://localhost:3001/api/analyze',
      },
    ];
  },
}

module.exports = nextConfig
