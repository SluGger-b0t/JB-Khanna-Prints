/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Optional: disable typescript errors as well (if needed)
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
