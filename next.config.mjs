/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  rewrites: async () => {
    return [
      {
        source: '/__/auth/:path*',
        destination: 'https://pixchar-db409.firebaseapp.com/__/auth/:path*', // Proxy to Backend
      },
    ];
  }
}

export default nextConfig
