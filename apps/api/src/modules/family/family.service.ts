import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

/**
 * FamilyService — stub.
 * Business logic will be implemented in Sprint 1.
 */
@Injectable()
export class FamilyService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): string {
    // TODO: Implement in Sprint 1 once Prisma models are defined
    return 'Family module — stub';
  }
}
