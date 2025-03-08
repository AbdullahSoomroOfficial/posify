import { makeRequest } from "@/lib/utils";
import { UpdateStockDto } from "@interfaces";

export const stock = {
  getStocks: async () => {
    return await makeRequest("GET", "/stocks");
  },

  getStockById: async (_id: string) => {
    return await makeRequest("GET", `/stocks/${_id}`);
  },

  updateStockById: async (_id: string, data: UpdateStockDto) => {
    return await makeRequest("PUT", `/stocks/${_id}`, data);
  },
};
