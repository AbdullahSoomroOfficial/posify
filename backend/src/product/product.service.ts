import { Product } from "./product.model";
import { Product as IProduct } from "../../../shared/interfaces";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-prodcut.dto";
import { stockService } from "src/stock/stock.service";

export const productService = {
  createProduct: async (data: CreateProductDto): Promise<IProduct> => {
    const newProduct = await Product.create(data);
    /* Inserting stock entry for newly created product with 0 quantity*/
    await stockService.createStock({ productId: newProduct._id, quantity: 0 });
    return newProduct;
  },

  getProducts: async (): Promise<IProduct[]> => {
    return await Product.find();
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
    return await Product.findByIdAndDelete(id);
  },
};
