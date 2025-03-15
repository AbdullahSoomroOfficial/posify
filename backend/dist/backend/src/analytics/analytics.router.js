"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsRouter = void 0;
const express_1 = __importDefault(require("express"));
const analytics_controller_1 = require("./analytics.controller");
const analyticsRouter = express_1.default.Router();
exports.analyticsRouter = analyticsRouter;
/* GET - /analytics */
analyticsRouter.get("/", analytics_controller_1.analyticsController.getAnalytics);
