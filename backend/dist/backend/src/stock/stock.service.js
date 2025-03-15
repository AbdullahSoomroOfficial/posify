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
exports.stockService = void 0;
const stock_model_1 = require("./stock.model");
exports.stockService = {
    createStock: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const newStock = new stock_model_1.Stock(data);
        return yield newStock.save();
    }),
    getStocks: (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield stock_model_1.Stock.find(query);
    }),
    getStockById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield stock_model_1.Stock.findById(id);
    }),
    updateStocksQuantityByProductId: (updates) => __awaiter(void 0, void 0, void 0, function* () {
        const bulkOp = updates.map(({ productId, quantity }) => ({
            updateOne: {
                filter: { productId },
                update: { $inc: { quantity } },
            },
        }));
        return yield stock_model_1.Stock.bulkWrite(bulkOp);
    }),
    updateStockById: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield stock_model_1.Stock.findByIdAndUpdate(id, data, { new: true });
    }),
    deleteStockById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield stock_model_1.Stock.findByIdAndDelete(id);
    }),
    deleteStockByProductId: (productId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield stock_model_1.Stock.findOneAndDelete({ productId });
    }),
};
