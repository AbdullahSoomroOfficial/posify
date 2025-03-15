"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = exports.orderSchema = void 0;
const mongoose_1 = require("mongoose");
const orderItemSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Product", required: true },
    price: { type: Number, required: true }, // Keeps a snapshot of product price
    quantity: { type: Number, required: true },
    lineTotal: { type: Number, required: true }, // quantity * price
}, { _id: false });
exports.orderSchema = new mongoose_1.Schema({
    items: [orderItemSchema],
    subTotal: { type: Number, required: true }, // Sum of all line totals
    discount: { type: Number, required: true },
    totalAmount: { type: Number, required: true }, // Subtotal + discount
}, { timestamps: { createdAt: true, updatedAt: false } });
exports.Order = (0, mongoose_1.model)("Order", exports.orderSchema);
