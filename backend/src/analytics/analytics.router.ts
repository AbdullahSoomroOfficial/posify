import express from "express";
import { analyticsController } from "./analytics.controller";

const analyticsRouter = express.Router();

/* GET - /analytics */
analyticsRouter.get("/", analyticsController.getAnalytics);

export { analyticsRouter };
