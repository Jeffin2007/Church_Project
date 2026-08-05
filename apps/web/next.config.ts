import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Standalone output for Docker
  output: 'standalone',

  // Turborepo — transpile workspace packages
  transpilePackages: ['@qoas/constants', '@qoas/types', '@qoas/validation'],

  // API proxy (development)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001/api'}/:path*`,
      },
    ];
  },

  // Images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'queenofallsaints.in',
      },
    ],
  },

  // Strict TypeScript checks during build
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
