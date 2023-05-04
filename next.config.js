// const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // i18n,
  publicRuntimeConfig: {
    HOST: process.env.HOST,
    CACHE_TIME_HOURS: Number.parseInt(process.env.CACHE_TIME_HOURS ?? '0'),
    NODE_ENV: process.env.NODE_ENV || 'development',
    DEV: process.env.NODE_ENV === 'development',
    PROD: process.env.NODE_ENV !== 'development',
    MAP_KEY: '00451464-c5d7-4f92-96bd-88b3f00ff218',
    BOOKING_COMPLETE_ANYTIME:  process.env.BOOKING_COMPLETE_ANYTIME ? true : false,
  },
  serverRuntimeConfig: {
    HOST_INNER: process.env.HOST_INNER,
    ROBOTS_FILE: process.env.ROBOTS_FILE,
  },
  async rewrites() {
    return [
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ]
  }
}
