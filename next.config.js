/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com'],
    },
    publicRuntimeConfig: {
        INFORMATION_SERVICE: process.env.INFORMATION_SERVICE,
        REVIEW_SERVICE: process.env.REVIEW_SERVICE,
        SEARCH_SERVICE: process.env.SEARCH_SERVICE
    }
}

module.exports = nextConfig
