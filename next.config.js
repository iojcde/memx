/** @type {import('next').NextConfig} */
const config = {
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
}

module.exports = config
