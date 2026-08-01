import { SetMetadata } from '@nestjs/common';
import type { FeatureFlag } from '@qoas/types';

export const FEATURE_FLAG_KEY = 'feature_flag';

/**
 * Decorator to enforce feature flags on routes or controllers.
 *
 * @example
 * @RequireFeature(FeatureFlag.LIVESTREAM)
 * @Get('livestream')
 */
export const RequireFeature = (flag: FeatureFlag): MethodDecorator & ClassDecorator =>
  SetMetadata(FEATURE_FLAG_KEY, flag);
