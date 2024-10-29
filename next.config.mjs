// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com", // The hostname of the images
        pathname: "/images/media/meals/**", // The pathname pattern for the images
      },
    ],
  },
};

export default nextConfig;
