import { Activities } from '@prisma/client';
import { prisma } from '@/config';

async function findActivities(): Promise<Activities[]> {
  return prisma.activities.findMany();
}

export default {
  findActivities,
};
