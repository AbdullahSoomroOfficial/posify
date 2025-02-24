import express from "express";
import { stockController } from "./stock.controller";
import { validate } from "../utils/validate.util";
// import { createStockDto } from "./dto/create-stock.dto";
import { updateStockDto } from "../../../shared/interfaces";

const stockRouter = express.Router();

// POST - /api/stocks
/**
 * @swagger
 * /api/stocks:
 *   post:
 *     summary: Create a new stock
 *     tags: [Stocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       201:
 *         description: Stock created successfully
 *       400:
 *         description: Bad request
 */
// stockRouter.post("/", validate(createStockDto), stockController.createStock);

// GET - /api/stocks
/**
 * @swagger
 * /api/stocks:
 *   get:
 *     summary: Get all stocks
 *     tags: [Stocks]
 *     responses:
 *       200:
 *         description: List of stocks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stock'
 */
stockRouter.get("/", stockController.getStocks);

// GET - /api/stocks/:id
/**
 * @swagger
 * /api/stocks/{id}:
 *   get:
 *     summary: Get a stock by ID
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock ID
 *     responses:
 *       200:
 *         description: Stock details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stock'
 *       404:
 *         description: Stock not found
 */
stockRouter.get("/:id", stockController.getStockById);

// PUT - /api/stocks/:id

/**
 * @swagger
 * /api/stocks/{id}:
 *   put:
 *     summary: Update a stock by ID
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stock'
 *     responses:
 *       200:
 *         description: Stock updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Stock not found
 */
stockRouter.put(
  "/:id",
  validate(updateStockDto),
  stockController.updateStockById
);

// DELETE - /api/stocks/:id

/**
 * @swagger
 * /api/stocks/{id}:
 *   delete:
 *     summary: Delete a stock by ID
 *     tags: [Stocks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Stock ID
 *     responses:
 *       200:
 *         description: Stock deleted successfully
 *       404:
 *         description: Stock not found
 */
// stockRouter.delete("/:id", stockController.deleteStockById);

export { stockRouter };
