/** @type {import('next').NextConfig} */
/* require('dotenv').config({ path: './.env.local' }); */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // Reference a variable that was defined in the .env.* file and make it available at Build Time
    SESSION_COOKIE_NAME: process.env.NEXT_PUBLIC_SESSION_COOKIE_NAME,
  },
};

module.exports = nextConfig;
