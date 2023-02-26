/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer')
const fs = require('fs')
<<<<<<< HEAD
const filenamesFile = fs.readFileSync('./data/filenames.json', 'utf8')
=======
const filenames = fs.readFileSync('./data/filenames.json', 'utf8')
>>>>>>> c4d4667 (cool post heaader)

const filenames = JSON.parse(filenamesFile)
module.exports = withContentlayer({
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  redirects: async () => {
<<<<<<< HEAD
    return Object.keys(filenames).map((key) => ({
=======
    return Object.keys(JSON.parse(filenames)).map((key) => ({
>>>>>>> c4d4667 (cool post heaader)
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
