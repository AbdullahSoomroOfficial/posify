"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockRouter = void 0;
const express_1 = __importDefault(require("express"));
const stock_controller_1 = require("./stock.controller");
const validate_util_1 = require("../utils/validate.util");
// import { createStockDto } from "./dto/create-stock.dto";
const dto_1 = require("../../../shared/dto");
const stockRouter = express_1.default.Router();
exports.stockRouter = stockRouter;
/* POST - /stocks */
// stockRouter.post("/", validate(createStockDto), stockController.createStock);
/* GET - /stocks */
stockRouter.get("/", stock_controller_1.stockController.getStocks);
/* GET - /stocks/{id} */
stockRouter.get("/:id", stock_controller_1.stockController.getStockById);
/* PUT - /stocks/{id} */
stockRouter.put("/:id", (0, validate_util_1.validate)(dto_1.updateStockDto), stock_controller_1.stockController.updateStockById);
