import express from "express";
import { stockController } from "./stock.controller";
import { validate } from "../utils/validate.util";
// import { createStockDto } from "./dto/create-stock.dto";
import { updateStockDto } from "../../../shared/interfaces";

const stockRouter = express.Router();

/* POST - /api/stocks */
// stockRouter.post("/", validate(createStockDto), stockController.createStock);

/* GET - /api/stocks */
stockRouter.get("/", stockController.getStocks);

/* GET - /api/stocks/{id} */
stockRouter.get("/:id", stockController.getStockById);

/* PUT - /api/stocks/{id} */
stockRouter.put(
  "/:id",
  validate(updateStockDto),
  stockController.updateStockById
);

/* DELETE - /api/stocks/{id} */
// stockRouter.delete("/:id", stockController.deleteStockById);

export { stockRouter };
