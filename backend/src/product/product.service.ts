import { Product } from "./product.model";
import { Product as IProduct } from "../../../shared/interfaces";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-prodcut.dto";
import { stockService } from "../stock/stock.service";
import { orderService } from "src/order/order.service";

export const productService = {
  createProduct: async (data: CreateProductDto): Promise<IProduct> => {
    const newProduct = await Product.create(data);
    /* Inserting stock entry for newly created product with quantity = 0 */
    await stockService.createStock({ productId: newProduct._id, quantity: 0 });
    return newProduct;
  },

  getProducts: async (query: object): Promise<IProduct[]> => {
    return await Product.find(query);
  },

  getProductById: async (id: string): Promise<IProduct | null> => {
    return await Product.findById(id);
  },

  updateProductById: async (
    id: string,
    data: UpdateProductDto
  ): Promise<IProduct | null> => {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  },

  deleteProductById: async (id: string): Promise<IProduct | null> => {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (deletedProduct) {
      await stockService.deleteStockByProductId(deletedProduct._id);
      await orderService.deleteOrdersByProductId(deletedProduct._id);
    }
    return deletedProduct;
  },
};
