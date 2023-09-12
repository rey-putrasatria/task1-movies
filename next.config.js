/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_KEY: process.env.API_KEY,
    ACCESS_TOKEN: process.env.ACCESS_TOKEN
  }
}

module.exports = nextConfig
