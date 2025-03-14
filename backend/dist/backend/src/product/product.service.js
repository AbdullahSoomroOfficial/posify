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
exports.productService = void 0;
const product_model_1 = require("./product.model");
const stock_service_1 = require("../stock/stock.service");
const order_service_1 = require("../order/order.service");
exports.productService = {
    createProduct: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const newProduct = yield product_model_1.Product.create(data);
        /* Inserting stock entry for newly created product with quantity = 0 */
        yield stock_service_1.stockService.createStock({ productId: newProduct._id, quantity: 0 });
        return newProduct;
    }),
    getProducts: (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_1.Product.find(query);
    }),
    getProductById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_1.Product.findById(id);
    }),
    updateProductById: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        return yield product_model_1.Product.findByIdAndUpdate(id, data, { new: true });
    }),
    deleteProductById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const deletedProduct = yield product_model_1.Product.findByIdAndDelete(id);
        if (deletedProduct) {
            yield stock_service_1.stockService.deleteStockByProductId(deletedProduct._id);
            yield order_service_1.orderService.deleteOrdersByProductId(deletedProduct._id);
        }
        return deletedProduct;
    }),
};
