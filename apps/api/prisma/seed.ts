import { PrismaClient, Role, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const BCRYPT_ROUNDS = 10;
const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding Queen of All Saints database with real profiles and data...');

  // 1. Seed Super Admin User
  const adminPasswordHash = await bcrypt.hash('Admin@QOAS2026!', BCRYPT_ROUNDS);
  const superAdmin = await prisma.user.upsert({
    where: { email: 'admin@queenofallsaints.in' },
    update: {
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      phone: '+91 94432 49671',
    },
    create: {
      email: 'admin@queenofallsaints.in',
      passwordHash: adminPasswordHash,
      role: Role.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      phone: '+91 94432 49671',
    },
  });
  console.log(`✅ Super Admin created: ${superAdmin.email} (${superAdmin.id})`);

  // 2. Seed Parish Priest User & Profile
  const priestPasswordHash = await bcrypt.hash('Priest@QOAS2026!', BCRYPT_ROUNDS);
  const parishPriest = await prisma.user.upsert({
    where: { email: 'priest@queenofallsaints.in' },
    update: {
      role: Role.PARISH_PRIEST,
      status: UserStatus.ACTIVE,
      phone: '+91 94432 49671',
    },
    create: {
      email: 'priest@queenofallsaints.in',
      passwordHash: priestPasswordHash,
      role: Role.PARISH_PRIEST,
      status: UserStatus.ACTIVE,
      phone: '+91 94432 49671',
    },
  });
  console.log(`✅ Parish Priest user created: ${parishPriest.email} (${parishPriest.id})`);

  // 3. Seed Parish Priest Profile record
  const priestProfile = await prisma.parishPriestProfile.upsert({
    where: { id: 'priest-profile-arokiyaswamy' },
    update: {
      name: 'Rev. Fr. ArokiyaSwamy O.Praem',
      roleTitle: 'Parish Priest',
      bioEn:
        'Rev. Fr. ArokiyaSwamy O.Praem serves as Parish Priest of Queen of All Saints Church, K.K. Nagar, Tiruchirappalli since 2025. He guides the parish in the Norbertine tradition of prayer, pastoral visitation, and care for all families across the 13 Anbiyams.',
      bioTa:
        'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம் 2025 முதல் அனைத்து புனிதர்களின் அரசி ஆலயத்தின் பங்குத்தந்தையாகப் பணியாற்றி வருகிறார். நார்பர்ட் சபையின் இறைவழிபாட்டுப் பாரம்பரியத்தோடும், இல்ல சந்திப்புகளோடும் 13 அன்பியங்களின் குடும்பங்களை ஆன்மீக வழியில் வழிநடத்துகிறார்.',
      photoUrl: '/images/priest/fr-arokiyaswamy.jpg',
      isCurrent: true,
      sortOrder: 1,
    },
    create: {
      id: 'priest-profile-arokiyaswamy',
      name: 'Rev. Fr. ArokiyaSwamy O.Praem',
      roleTitle: 'Parish Priest',
      bioEn:
        'Rev. Fr. ArokiyaSwamy O.Praem serves as Parish Priest of Queen of All Saints Church, K.K. Nagar, Tiruchirappalli since 2025. He guides the parish in the Norbertine tradition of prayer, pastoral visitation, and care for all families across the 13 Anbiyams.',
      bioTa:
        'அருட்பணி ஆரோக்கியசாமி ஓப்ரேம் 2025 முதல் அனைத்து புனிதர்களின் அரசி ஆலயத்தின் பங்குத்தந்தையாகப் பணியாற்றி வருகிறார். நார்பர்ட் சபையின் இறைவழிபாட்டுப் பாரம்பரியத்தோடும், இல்ல சந்திப்புகளோடும் 13 அன்பியங்களின் குடும்பங்களை ஆன்மீக வழியில் வழிநடத்துகிறார்.',
      photoUrl: '/images/priest/fr-arokiyaswamy.jpg',
      isCurrent: true,
      sortOrder: 1,
    },
  });
  console.log(`✅ Parish Priest Profile seeded: ${priestProfile.name}`);

  // 4. Default Anbiyams
  const anbiyamsList = [
    { name: 'St. Augustine Anbiyam', description: 'St. Augustine Anbiyam - KK Nagar' },
    { name: 'St. Theresa Anbiyam', description: 'St. Theresa Anbiyam - KK Nagar' },
    { name: 'St. Anthony Anbiyam', description: 'St. Anthony Anbiyam - KK Nagar' },
    { name: 'St. Cecilia Anbiyam', description: 'St. Cecilia Anbiyam - KK Nagar' },
    { name: 'St. Norbert Anbiyam', description: 'St. Norbert Anbiyam - KK Nagar' },
    { name: 'Infant Jesus Anbiyam', description: 'Infant Jesus Anbiyam - KK Nagar' },
    { name: 'St. Xavier Anbiyam', description: 'St. Xavier Anbiyam - KK Nagar' },
    { name: 'St. Alphonsa Anbiyam', description: 'St. Alphonsa Anbiyam - KK Nagar' },
    { name: 'Jesus Mary Joseph (JMJ) Anbiyam', description: 'JMJ Anbiyam - KK Nagar' },
    { name: 'St. John De Britto Anbiyam', description: 'St. John De Britto Anbiyam - KK Nagar' },
    { name: 'Anglo Indian Community', description: 'Anglo Indian Community - KK Nagar' },
    { name: 'St. Joseph Anbiyam', description: 'St. Joseph Anbiyam - KK Nagar' },
    { name: 'Gandhi Nagar Sub-station', description: 'Gandhi Nagar Sub-station' },
  ];

  for (const anb of anbiyamsList) {
    await prisma.anbiyam.upsert({
      where: { name: anb.name },
      update: { description: anb.description, isActive: true },
      create: { name: anb.name, description: anb.description, isActive: true },
    });
  }
  console.log(`✅ ${anbiyamsList.length} Anbiyams synced into database.`);

  console.log('🎉 Database seeding and profile sync completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
