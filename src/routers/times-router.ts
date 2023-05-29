import { getActivityTimeById } from "@/controllers/times-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";


const timeRouter = Router();

timeRouter
    .all('/*', authenticateToken)
    .get('/:timeId', getActivityTimeById);

export { timeRouter };
