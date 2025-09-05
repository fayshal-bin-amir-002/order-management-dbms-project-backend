import { Document, Types } from "mongoose";

export interface IOrderItem {
  product_id: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  customer_id: Types.ObjectId;
  items: IOrderItem[];
  status: "pending" | "shipped" | "delivered" | "cancelled";
  ordered_at: Date;
}
