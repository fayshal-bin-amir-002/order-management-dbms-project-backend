import { Types } from "mongoose";

export interface IDelivery {
  order_id: Types.ObjectId;
  delivered: boolean;
  date: null | Date;
  shipping_method: string | null;
}
