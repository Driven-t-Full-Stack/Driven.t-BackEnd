import { Request, Response } from 'express';
import httpStatus from 'http-status';
import activityService from '@/services/activities-service';

export async function getDefaultActivities(_req: Request, res: Response) {
  try {
    const activities = await activityService.getActivityList();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
