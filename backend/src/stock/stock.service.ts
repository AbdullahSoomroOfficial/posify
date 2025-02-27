import { Stock } from "./stock.model";
import { Stock as IStock } from "../../../shared/interfaces";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";

export const stockService = {
  createStock: async (data: CreateStockDto): Promise<IStock> => {
    const newStock = new Stock(data);
    return await newStock.save();
  },

  getStocks: async (query: object): Promise<IStock[]> => {
    return await Stock.find(query);
  },

  getStockById: async (id: string): Promise<IStock | null> => {
    return await Stock.findById(id);
  },

  updateStocksQuantityByProductId: async (
    updates: {
      productId: string /* Filter by productId */;
      quantity: number /* Update quantity field */;
    }[]
  ): Promise<any> => {
    const bulkOp = updates.map(({ productId, quantity }) => ({
      updateOne: {
        filter: { productId },
        update: { $inc: { quantity } },
      },
    }));
    return await Stock.bulkWrite(bulkOp);
  },

  updateStockById: async (
    id: string,
    data: UpdateStockDto
  ): Promise<IStock | null> => {
    return await Stock.findByIdAndUpdate(id, data, { new: true });
  },

  deleteStockById: async (id: string): Promise<IStock | null> => {
    return await Stock.findByIdAndDelete(id);
  },

  deleteStockByProductId: async (productId: string): Promise<IStock | null> => {
    return await Stock.findOneAndDelete({ productId });
  },
};
