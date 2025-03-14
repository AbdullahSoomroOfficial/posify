"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stock = void 0;
const mongoose_1 = require("mongoose");
const stockSchema = new mongoose_1.Schema({
    productId: { type: String, ref: "Product", unique: true, required: true },
    quantity: { type: Number, required: true },
});
exports.Stock = (0, mongoose_1.model)("Stock", stockSchema);
