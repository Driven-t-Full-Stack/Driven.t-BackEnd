import { AuthenticatedRequest } from "@/middlewares";
import timeService from "@/services/times-service";
import { time } from "console";
import { NextFunction, Response } from "express";
import httpStatus from "http-status";

export async function getActivityTimeById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const timeId = Number(req.params.timeId);
    if (!timeId) return res.sendStatus(httpStatus.BAD_REQUEST);

    try {
        const times = await timeService.getTimeById(timeId);

        return res.status(httpStatus.OK).send(times);
    } catch (error) {
        next(error);
    }
}