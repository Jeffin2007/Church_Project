import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  name: process.env['APP_NAME'] ?? 'Queen of All Saints API',
  nodeEnv: process.env['NODE_ENV'] ?? 'development',
  port: parseInt(process.env['PORT'] ?? '3001', 10),
  clientUrl: process.env['CLIENT_URL'] ?? 'http://localhost:3000',
  apiPrefix: 'api',
  apiVersion: 'v1',
}));
