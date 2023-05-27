import { Router } from 'express';
import { getDefaultActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.get('/', getDefaultActivities);

export { activitiesRouter };
