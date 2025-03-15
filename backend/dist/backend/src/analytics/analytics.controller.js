"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyticsController = void 0;
const response_util_1 = require("../utils/response.util");
const analytics_service_1 = require("./analytics.service");
exports.analyticsController = {
    getAnalytics: (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const analytics = yield analytics_service_1.analyticsService.getAnalytics();
            response
                .status(200)
                .json((0, response_util_1.createResponse)(true, analytics, "Analytics fetched successfully", null, null, null));
        }
        catch (error) {
            next(error);
        }
    }),
};
