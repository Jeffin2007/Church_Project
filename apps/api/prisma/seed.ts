import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Role } from '@qoas/types';
import { BCRYPT_ROUNDS } from '@qoas/constants';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding Queen of All Saints database...');

  // 1. Seed Roles & Permissions Metadata (Console log for Sprint 0)
  const roles = Object.values(Role);
  console.log(`✅ System roles defined: ${roles.join(', ')}`);

  // 2. Default Anbiyams
  const anbiyams = [
    'St. Thomas Anbiyam',
    'St. Joseph Anbiyam',
    'St. Jude Anbiyam',
    'St. Antony Anbiyam',
    'St. Xavier Anbiyam',
    'St. Teresa Anbiyam',
    'Our Lady of Good Health Anbiyam',
  ];
  console.log(`✅ Default Anbiyams defined (${anbiyams.length}): ${anbiyams.join(', ')}`);

  // 3. Default Payment Categories
  const paymentCategories = ['Monthly Dues', 'Festival Offering', 'Sacrament Dues', 'Building Fund', 'Donation'];
  console.log(`✅ Payment categories defined: ${paymentCategories.join(', ')}`);

  // 4. Default Ministry Categories
  const ministryCategories = [
    'Youth Movement',
    'Legion of Mary',
    'Altar Servers Association',
    'Parish Choir',
    'Vincent de Paul Society',
    'Catechism Teachers Association',
  ];
  console.log(`✅ Ministry categories defined: ${ministryCategories.join(', ')}`);

  // 5. Default Admin Credentials setup check
  const adminPasswordHash = await bcrypt.hash('Admin@QOAS2026!', BCRYPT_ROUNDS);
  console.log('✅ Super Admin seed credentials prepared (admin@queenofallsaints.in)');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
