"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const validate_util_1 = require("../utils/validate.util");
const dto_1 = require("../../../shared/dto");
const dto_2 = require("../../../shared/dto");
const productRouter = express_1.default.Router();
exports.productRouter = productRouter;
/* POST - /products */
productRouter.post("/", (0, validate_util_1.validate)(dto_1.createProductDto), product_controller_1.productController.createProduct);
/* GET - /products */
productRouter.get("/", product_controller_1.productController.getProducts);
/* GET - /products/{id} */
productRouter.get("/:id", product_controller_1.productController.getProductById);
/* PUT - /products/{id} */
productRouter.put("/:id", (0, validate_util_1.validate)(dto_2.updateProductDto), product_controller_1.productController.updateProductById);
/* DELETE - /products/{id} */
productRouter.delete("/:id", product_controller_1.productController.deleteProductById);
