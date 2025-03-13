import { makeRequest } from "@/lib/utils";
import { CreateOrderDto, UpdateOrderDto } from "@interfaces";

export const order = {
  createOrder: async (data: CreateOrderDto) => {
    return await makeRequest("POST", "/orders", data);
  },

  getOrders: async () => {
    return await makeRequest("GET", "/orders");
  },

  getOrderById: async (_id: string) => {
    return await makeRequest("GET", `/orders/${_id}`);
  },

  updateOrderById: async (_id: string, data: UpdateOrderDto) => {
    return await makeRequest("PUT", `/orders/${_id}`, data);
  },

  deleteOrderById: async (_id: string) => {
    return await makeRequest("DELETE", `/orders/${_id}`);
  },
};
