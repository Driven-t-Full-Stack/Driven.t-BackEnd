import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activityService from '@/services/activities-service';

export async function getDefaultActivities(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  try {
    const activities = await activityService.getActivityList();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
