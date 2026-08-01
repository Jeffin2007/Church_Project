import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import type { FeatureFlag } from '@qoas/types';
import { FEATURE_FLAG_KEY } from '../decorators/require-feature.decorator';

/**
 * FeatureFlagGuard — checks if a feature flag is enabled in configuration before allowing route execution.
 * If disabled, throws 404 Not Found to completely hide the endpoint.
 */
@Injectable()
export class FeatureFlagGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredFlag = this.reflector.getAllAndOverride<FeatureFlag>(FEATURE_FLAG_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredFlag) {
      return true;
    }

    const isEnabled = this.configService.get<boolean>(`features.${requiredFlag}`) ?? false;

    if (!isEnabled) {
      throw new NotFoundException(`Feature ${requiredFlag} is not enabled`);
    }

    return true;
  }
}
