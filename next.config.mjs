/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Prevent Next.js from trying to statically prerender API routes at build time
  // This fixes "Dynamic server usage" errors when connecting to DB/Redis during build
  experimental: {
    serverComponentsExternalPackages: ['bcryptjs'],
  },
};

export default nextConfig;

