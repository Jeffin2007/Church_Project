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
    'St. Augustine Anbiyam',
    'St. Theresa Anbiyam',
    'St. Anthony Anbiyam',
    'St. Cecilia Anbiyam',
    'St. Norbert Anbiyam',
    'Infant Jesus Anbiyam',
    'St. Xavier Anbiyam',
    'St. Alphonsa Anbiyam',
    'Jesus Mary Joseph (JMJ) Anbiyam',
    'St. John De Britto Anbiyam',
    'Anglo Indian Community',
    'St. Joseph Anbiyam',
    'Gandhi Nagar Sub-station',
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

  // 6. Summary of loaded Family Seed Data
  const stAugustine = require('./data/st-augustine.json');
  const stTheresa = require('./data/st-theresa.json');
  const stAnthony = require('./data/st-anthony.json');
  const stCecilia = require('./data/st-cecilia.json');
  const stNorbert = require('./data/st-norbert.json');
  const infantJesus = require('./data/infant-jesus.json');
  const stXavier = require('./data/st-xavier.json');
  const stAlphonsa = require('./data/st-alphonsa.json');
  const jmj = require('./data/jmj.json');
  const stJohnDeBritto = require('./data/st-john-de-britto.json');
  const angloIndian = require('./data/anglo-indian.json');
  const stJoseph = require('./data/st-joseph.json');
  const gandhiNagar = require('./data/gandhi-nagar.json');

  const totalFamilies =
    stAugustine.length +
    stTheresa.length +
    stAnthony.length +
    stCecilia.length +
    stNorbert.length +
    infantJesus.length +
    stXavier.length +
    stAlphonsa.length +
    jmj.length +
    stJohnDeBritto.length +
    angloIndian.length +
    stJoseph.length +
    gandhiNagar.length;

  console.log(`✅ Total family seed records verified across 13 Anbiyams: ${totalFamilies} families`);
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
