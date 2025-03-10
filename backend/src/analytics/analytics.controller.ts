import { NextFunction, Request, Response } from "express-serve-static-core";
import { createResponse } from "../utils/response.util";
import { analyticsService } from "./analytics.service";

export const analyticsController = {
  getAnalytics: async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const analytics = await analyticsService.getAnalytics();
      response
        .status(200)
        .json(
          createResponse(
            true,
            analytics,
            "Analytics fetched successfully",
            null,
            null,
            null
          )
        );
    } catch (error) {
      next(error);
    }
  },
};
