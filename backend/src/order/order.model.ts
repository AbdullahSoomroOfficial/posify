import { model, Schema } from "mongoose";
import { Order as IOrder } from "../../../shared/interfaces";

const orderItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    price: { type: Number }, // Keeps a snapshot of product price
    quantity: { type: Number },
    lineTotal: { type: Number }, // quantity * price
  },
  { _id: false }
);

export const orderSchema = new Schema<IOrder>({
  items: [orderItemSchema],
  subtotal: { type: Number }, // Sum of all line totals
  discount: { type: Number },
  totalAmount: { type: Number }, // Subtotal + discount
});

export const Order = model<IOrder>("Order", orderSchema);
