/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  plugins: ['tailwindcss'],
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains:[
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'i.pinimg.com',
      'static.wikia.nocookie.net',
      'res.cloudinary.com',
      'fakestoreapi.com',
      'cdn.mukama.com'
    ],
  },
};

module.exports = nextConfig
