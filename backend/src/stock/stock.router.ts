import express from "express";
import { stockController } from "./stock.controller";
import { validate } from "../utils/validate.util";
// import { createStockDto } from "./dto/create-stock.dto";
import { updateStockDto } from "../../../shared/dto";

const stockRouter = express.Router();

/* POST - /stocks */
// stockRouter.post("/", validate(createStockDto), stockController.createStock);

/* GET - /stocks */
stockRouter.get("/", stockController.getStocks);

/* GET - /stocks/{id} */
stockRouter.get("/:id", stockController.getStockById);

/* PUT - /stocks/{id} */
stockRouter.put(
  "/:id",
  validate(updateStockDto),
  stockController.updateStockById
);

/* DELETE - /stocks/{id} */
// stockRouter.delete("/:id", stockController.deleteStockById);

export { stockRouter };
