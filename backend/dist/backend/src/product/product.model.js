"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    price: { type: Number, required: true },
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
