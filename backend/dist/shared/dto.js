"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderDto =
  exports.createOrderDto =
  exports.updateStockDto =
  exports.createStockDto =
  exports.updateProductDto =
  exports.createProductDto =
    void 0;
/* DTO's */
const zod_1 = require("../../node_modules/zod");
exports.createProductDto = zod_1.z
  .object({
    name: zod_1.z.string(),
    price: zod_1.z.coerce.number(),
  })
  .strip();
exports.updateProductDto = exports.createProductDto
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one of 'name' or 'price' is required",
  });
exports.createStockDto = zod_1.z
  .object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.coerce.number().min(0),
  })
  .strip();
exports.updateStockDto = exports.createStockDto.pick({ quantity: true });
exports.createOrderDto = zod_1.z
  .object({
    items: zod_1.z
      .object({
        productId: zod_1.z.string(),
        quantity: zod_1.z.number().min(1),
      })
      .array()
      .refine((value) => value.length > 0, {
        message: "Order must contain at least one item",
      }),
    discount: zod_1.z.number().min(0).max(100),
  })
  .strip();
exports.updateOrderDto = exports.createOrderDto;
