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
exports.orderService = void 0;
const order_model_1 = require("./order.model");
const stock_service_1 = require("../stock/stock.service");
const error_util_1 = require("../utils/error.util");
const product_service_1 = require("../product/product.service");
exports.orderService = {
    createOrder: (data) => __awaiter(void 0, void 0, void 0, function* () {
        // Gather unique productIds from the order items.
        const productIds = Array.from(new Set(data.items.map((item) => item.productId)));
        // Fetch stocks and product details for all unique product IDs.
        const stocks = yield stock_service_1.stockService.getStocks({
            productId: { $in: productIds },
        });
        const products = yield product_service_1.productService.getProducts({
            _id: { $in: productIds },
        });
        // Validate that each order item has sufficient stock.
        const validationErrors = [];
        data.items.forEach((item) => {
            const stock = stocks.find((s) => s.productId === item.productId);
            // if (!stock) {
            //   validationErrors.push(`Stock for product ${item.productId} not found`);
            // } else
            if (stock) {
                if (stock.quantity < item.quantity) {
                    validationErrors.push(`Insufficient stock for product ${item.productId}`);
                }
            }
        });
        // If any validation errors exist, throw a combined BadRequestError.
        if (validationErrors.length > 0) {
            throw new error_util_1.BadRequestError(JSON.stringify(validationErrors));
        }
        // Prepare bulk update operations to decrement stock quantities.
        const stocksToUpdate = data.items.map((item) => ({
            productId: item.productId,
            quantity: -item.quantity, // Negative value for decrementing stock
        }));
        // Update stock quantities.
        yield stock_service_1.stockService.updateStocksQuantityByProductId(stocksToUpdate);
        // const products = stocks.map(
        //   (stock) => stock.productId as unknown as IProduct
        // );
        // Create and save the new order with fetched product details.
        let subTotal = 0;
        let discount = data.discount;
        let newOrderData = {
            items: data.items.map((item) => {
                const product = products.find((p) => p._id.toString() === item.productId);
                const lineTotal = product.price * item.quantity; // Calculate line total
                subTotal += lineTotal; // Accumulate subTotal
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    lineTotal,
                };
            }),
            subTotal: subTotal,
            discount: discount,
            totalAmount: subTotal * (1 - discount / 100),
        };
        const newOrder = new order_model_1.Order(newOrderData);
        return yield newOrder.save();
    }),
    getOrders: (query) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_1.Order.find(query);
    }),
    getOrderById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_1.Order.findById(id);
    }),
    updateOrderById: (id, data) => __awaiter(void 0, void 0, void 0, function* () {
        // Fetch the existing order.
        const existingOrder = yield order_model_1.Order.findById(id);
        if (!existingOrder) {
            throw new error_util_1.NotFoundError("Order not found");
        }
        // Build maps for old and new quantities per productId.
        const oldQuantities = new Map();
        existingOrder.items.forEach((item) => {
            oldQuantities.set(item.productId, (oldQuantities.get(item.productId) || 0) + item.quantity);
        });
        const newQuantities = new Map();
        data.items.forEach((item) => {
            newQuantities.set(item.productId, (newQuantities.get(item.productId) || 0) + item.quantity);
        });
        // Create a set of all productIds present in either old or new order.
        const productIds = Array.from(new Set([...oldQuantities.keys(), ...newQuantities.keys()]));
        // Fetch stocks for all involved product IDs.
        const stocks = yield stock_service_1.stockService.getStocks({
            productId: { $in: productIds },
        });
        // Validate each product's stock when new quantity is greater than the old.
        const validationErrors = [];
        productIds.forEach((productId) => {
            const oldQuantity = oldQuantities.get(productId) || 0;
            const newQuantity = newQuantities.get(productId) || 0;
            const delta = newQuantity - oldQuantity;
            if (delta > 0) {
                const stock = stocks.find((s) => s.productId === productId);
                if (!stock) {
                    validationErrors.push(`Stock for product ${productId} not found`);
                }
                else if (stock.quantity < delta) {
                    validationErrors.push(`Insufficient stock for product ${productId}`);
                }
            }
        });
        if (validationErrors.length > 0) {
            throw new error_util_1.BadRequestError(JSON.stringify(validationErrors));
        }
        // Prepare bulk updates for stocks.
        // For each product, the change to the stock should be the negative delta.
        // When delta is positive (new > old), stock must be decremented.
        // When delta is negative (old > new), stock will be incremented.
        const stocksToUpdate = productIds.map((productId) => {
            const oldQuantity = oldQuantities.get(productId) || 0;
            const newQuantity = newQuantities.get(productId) || 0;
            const delta = newQuantity - oldQuantity;
            return {
                productId,
                quantity: -delta, // subtract if delta > 0; add back if delta < 0
            };
        });
        // Update the stocks in bulk.
        yield stock_service_1.stockService.updateStocksQuantityByProductId(stocksToUpdate);
        const products = stocks.map((stock) => stock.productId);
        let subTotal = 0;
        let discount = data.discount;
        let updatedOrderData = {
            items: data.items.map((item) => {
                const product = products.find((p) => p._id === item.productId);
                const lineTotal = product.price * item.quantity; // Calculate line total
                subTotal += lineTotal; // Accumulate subTotal
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    price: product.price,
                    lineTotal,
                };
            }),
            subTotal: subTotal,
            discount: discount,
            totalAmount: subTotal * (1 - discount / 100),
        };
        // Update the order with new data.
        const updatedOrder = yield order_model_1.Order.findByIdAndUpdate(id, updatedOrderData, {
            new: true,
        });
        return updatedOrder;
    }),
    /*
      When user delete order, stock quantity will be updated by adding the quantity back exist in the order
      for each product.
    */
    deleteOrderById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const order = yield order_model_1.Order.findByIdAndDelete(id);
        if (order) {
            const stocksToUpdate = order.items.map((item) => {
                return {
                    productId: item.productId,
                    quantity: item.quantity, // Add the quantity back to stock
                };
            });
            yield stock_service_1.stockService.updateStocksQuantityByProductId(stocksToUpdate);
        }
        return order;
    }),
    /* When product get deleted all of its linked order get deleted */
    deleteOrdersByProductId: (productId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield order_model_1.Order.deleteMany({ productId });
    }),
};
