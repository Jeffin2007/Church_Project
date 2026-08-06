import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  // Monorepo output tracing root
  outputFileTracingRoot: path.join(__dirname, '../../'),

  // Turborepo — transpile workspace packages
  transpilePackages: ['@qoas/constants', '@qoas/types', '@qoas/validation'],

  // API proxy (development)
  async rewrites() {
    const rawApiUrl = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001/api/v1';
    const apiBase = rawApiUrl.replace(/\/v1\/?$/, '');
    return [
      {
        source: '/api/:path*',
        destination: `${apiBase}/:path*`,
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
