import { makeRequest } from "@/lib/utils";
import { UpdateOrderDto } from "@interfaces";

export const stock = {
  getOrders: async () => {
    return await makeRequest("GET", "/orders");
  },

  getOrderById: async (_id: string) => {
    return await makeRequest("GET", `/orders/${_id}`);
  },

  updateOrderById: async (_id: string, data: UpdateOrderDto) => {
    return await makeRequest("PUT", `/orders/${_id}`, data);
  },
};
