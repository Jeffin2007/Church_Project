import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { Request } from 'express';

import { HEADER_REQUEST_ID } from '@qoas/constants';
import type { ApiResponse } from '@qoas/types';

/**
 * Transform Interceptor — wraps all successful responses in the standardized ApiResponse envelope.
 *
 * Output: { success: true, data: T, timestamp: string, requestId: string }
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest<Request>();
    const requestId = (request.headers[HEADER_REQUEST_ID.toLowerCase()] as string) ?? 'unknown';

    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        timestamp: new Date().toISOString(),
        requestId,
      })),
    );
  }
}
