/** @type {import('next').NextConfig} */
const nextConfig = {
  plugins: ['tailwindcss'],
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:[
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ],
  },
};

module.exports = nextConfig
