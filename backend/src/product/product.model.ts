import { Schema, model } from "mongoose";
import { Product as IProduct } from "../../../shared/interfaces";

const productSchema = new Schema<IProduct>({
  name: { type: String, unique: true },
  price: { type: Number },
});

export const Product = model<IProduct>("Product", productSchema);
