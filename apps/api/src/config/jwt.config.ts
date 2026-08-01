import { registerAs } from '@nestjs/config';

import { ACCESS_TOKEN_EXPIRY_SECONDS, REFRESH_TOKEN_EXPIRY_SECONDS } from '@qoas/constants';

export default registerAs('jwt', () => ({
  accessSecret: process.env['JWT_ACCESS_SECRET'] ?? 'CHANGE_ME_IN_PRODUCTION',
  accessExpiresIn: ACCESS_TOKEN_EXPIRY_SECONDS,
  refreshSecret: process.env['JWT_REFRESH_SECRET'] ?? 'CHANGE_ME_REFRESH_IN_PRODUCTION',
  refreshExpiresIn: REFRESH_TOKEN_EXPIRY_SECONDS,
}));
