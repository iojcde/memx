/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'res.cloudinary.com',
      'the.owo.foundation',
      'owo.whats-th.is',
    ],
    formats: ['image/avif', 'image/webp'],
  },
})
