/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com',],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true
}
