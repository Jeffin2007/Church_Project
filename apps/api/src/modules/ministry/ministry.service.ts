import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

/**
 * MinistryService — stub.
 * Business logic will be implemented in Sprint 1.
 */
@Injectable()
export class MinistryService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): string {
    // TODO: Implement in Sprint 1 once Prisma models are defined
    return 'Ministry module — stub';
  }
}
