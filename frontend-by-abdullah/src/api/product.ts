import { makeRequest } from "@/lib/utils";
import { CreateProductDto, UpdateProductDto } from "@interfaces";

export const product = {
  createProduct: async (data: CreateProductDto) => {
    return await makeRequest("POST", "/products", data);
  },

  getProducts: async () => {
    return await makeRequest("GET", "/products");
  },

  getProductById: async (_id: string) => {
    return await makeRequest("GET", `/products/${_id}`);
  },

  updateProductById: async (_id: string, data: UpdateProductDto) => {
    return await makeRequest("PUT", `/products/${_id}`, data);
  },

  deleteProductById: async (_id: string) => {
    return await makeRequest("DELETE", `/products/${_id}`);
  },
};
