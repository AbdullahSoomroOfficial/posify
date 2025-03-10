import { Order } from "../order/order.model";
import { Analytics } from "../../../shared/interfaces";

export const analyticsService = {
  getAnalytics: async (): Promise<Analytics> => {
    const now = new Date();
    // Today's start (midnight)
    const todayStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );

    // Last month: previous calendar month boundaries
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);

    // Last 6 months: from the start of the month six months ago
    const sixMonthsStart = new Date(now.getFullYear(), now.getMonth() - 6, 1);

    // Aggregation pipeline with $facet to run parallel queries
    const result = await Order.aggregate([
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

    const todaySales =
      result[0].todaySales.length > 0 ? result[0].todaySales[0].total : 0;
    const lastMonthSales =
      result[0].lastMonthSales.length > 0
        ? result[0].lastMonthSales[0].total
        : 0;
    const lastSixMonthsSales =
      result[0].lastSixMonthsSales.length > 0
        ? result[0].lastSixMonthsSales[0].total
        : 0;

    return {
      todaySales,
      lastMonthSales,
      lastSixMonthsSales,
    };
  },
};
