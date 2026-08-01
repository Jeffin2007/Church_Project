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
import type { ProblemDetail } from '@qoas/types';

/**
 * Global HTTP Exception Filter.
 * Returns RFC 7807 Problem Details format for all HTTP errors.
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
    let errors: Record<string, string[]> | undefined;
    if (
      typeof exceptionResponse === 'object' &&
      'message' in exceptionResponse &&
      Array.isArray((exceptionResponse as { message: unknown }).message)
    ) {
      const messages = (exceptionResponse as { message: string[] }).message;
      errors = { validation: messages };
    }

    const problem: ProblemDetail = {
      type: `https://queenofallsaints.in/errors/${status}`,
      title: HttpStatus[status] ?? 'Error',
      status,
      detail:
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as { message: string }).message ?? exception.message),
      instance: request.url,
      requestId,
      timestamp: new Date().toISOString(),
      errors,
    };

    if (status >= 500) {
      this.logger.error(
        { requestId, status, url: request.url, method: request.method },
        exception.message,
        exception.stack,
      );
    }

    response.status(status).set('Content-Type', 'application/problem+json').json(problem);
  }
}
