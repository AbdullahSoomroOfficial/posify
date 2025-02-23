import { Schema, model } from "mongoose";
import { Stock as IStock } from "../../../shared/interfaces";

const stockSchema = new Schema<IStock>({
  productId: { type: String, ref: "Product", unique: true },
  quantity: { type: Number },
});

export const Stock = model<IStock>("Stock", stockSchema);
