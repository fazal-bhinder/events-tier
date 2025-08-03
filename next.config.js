/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'picsum.photos'],
  },
  experimental: {
    appDir: true,
  },
  transpilePackages: ['framer-motion'],
  swcMinify: true,
}

module.exports = nextConfig