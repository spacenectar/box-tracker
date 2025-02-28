import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUsers() {
  console.log('Seeding users...');

  const users = [
    { authId: 'user_2szaxTCBOx4Xya44cjafxzNmkhe', subscriber: true }
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { authId: user.authId },
      update: {},
      create: user,
    });
  }

  console.log('Users seeded.');
}
