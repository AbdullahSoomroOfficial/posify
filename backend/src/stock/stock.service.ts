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
    return await Stock.find(query).populate("productId");
  },

  getStockById: async (id: string): Promise<IStock | null> => {
    return await Stock.findById(id);
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
};
