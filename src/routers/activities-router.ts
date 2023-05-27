import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getDefaultActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getDefaultActivities);

export { activitiesRouter };
