import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  transpilePackages: ['@qoas/constants', '@qoas/types', '@qoas/validation'],

  async rewrites() {
    if (process.env['ENABLE_EXTERNAL_API_PROXY'] === 'true') {
      const rawApiUrl = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3001/api/v1';
      const apiBase = rawApiUrl.replace(/\/v1\/?$/, '');
      return [
        {
          source: '/api/v1/backend/:path*',
          destination: `${apiBase}/:path*`,
        },
      ];
    }
    return [];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'queenofallsaints.in',
      },
    ],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
