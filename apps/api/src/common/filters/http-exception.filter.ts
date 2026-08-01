import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response, Request } from 'express';

import { HEADER_REQUEST_ID } from '@qoas/constants';
import type { ApiErrorResponse } from '@qoas/types';

/**
 * Global HTTP Exception Filter.
 * Returns standardized ApiErrorResponse envelope for all HTTP errors.
 *
 * Structure: { success: false, code, message, details, timestamp, requestId }
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const requestId = (request.headers[HEADER_REQUEST_ID.toLowerCase()] as string) ?? 'unknown';

    // Extract validation errors from class-validator
    let details: Record<string, string[]> | null = null;
    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray((exceptionResponse as { message: unknown }).message)
    ) {
      const messages = (exceptionResponse as { message: string[] }).message;
      details = { validation: messages };
    }

    const code = `HTTP_${status}_${HttpStatus[status] ?? 'ERROR'}`;
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as { message: string }).message ?? exception.message;

    const errorResponse: ApiErrorResponse = {
      success: false,
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
      requestId,
    };

    if (status >= 500) {
      this.logger.error(
        { requestId, status, url: request.url, method: request.method },
        exception.message,
        exception.stack,
      );
    }

    response.status(status).json(errorResponse);
  }
}
