/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/brochures',
        destination: '/catalogs',
        permanent: true,
      },
      {
        source: '/brochures/:slug',
        destination: '/catalogs/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
