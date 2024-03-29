/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')
const fs = require('fs')
const filenamesFile = fs.readFileSync('./assets/filenames.json', 'utf8')

const filenames = JSON.parse(filenamesFile)
module.exports = withContentlayer({
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  redirects: async () => {
    return Object.keys(filenames).map((key) => ({
      source: `/${key}`,
      destination: `/${filenames[key]}`,
      permanent: false,
    }))
  },
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
