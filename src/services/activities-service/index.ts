import { Activities } from '@prisma/client';
import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivityList(): Promise<Activities[]> {
  const activities = await activitiesRepository.findActivities();
  if (!activities) throw notFoundError();

  return activities;
}

const activityService = {
  getActivityList,
};

export default activityService;
