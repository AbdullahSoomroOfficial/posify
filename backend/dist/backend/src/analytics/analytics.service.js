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
exports.analyticsService = void 0;
const order_model_1 = require("../order/order.model");
exports.analyticsService = {
    getAnalytics: () => __awaiter(void 0, void 0, void 0, function* () {
        const now = new Date();
        // Today's start (midnight)
        const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        // Last month: previous calendar month boundaries
        const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);
        // Last 6 months: from the start of the month six months ago
        const sixMonthsStart = new Date(now.getFullYear(), now.getMonth() - 6, 1);
        // Aggregation pipeline with $facet to run parallel queries
        const result = yield order_model_1.Order.aggregate([
            {
                $facet: {
                    todaySales: [
                        { $match: { createdAt: { $gte: todayStart } } },
                        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
                    ],
                    lastMonthSales: [
                        {
                            $match: {
                                createdAt: { $gte: lastMonthStart, $lt: lastMonthEnd },
                            },
                        },
                        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
                    ],
                    lastSixMonthsSales: [
                        { $match: { createdAt: { $gte: sixMonthsStart } } },
                        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
                    ],
                },
            },
        ]);
        const todaySales = result[0].todaySales.length > 0 ? result[0].todaySales[0].total : 0;
        const lastMonthSales = result[0].lastMonthSales.length > 0
            ? result[0].lastMonthSales[0].total
            : 0;
        const lastSixMonthsSales = result[0].lastSixMonthsSales.length > 0
            ? result[0].lastSixMonthsSales[0].total
            : 0;
        return {
            todaySales,
            lastMonthSales,
            lastSixMonthsSales,
        };
    }),
};
