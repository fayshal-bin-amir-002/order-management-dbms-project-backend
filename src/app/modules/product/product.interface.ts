import { Model, Types } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export interface ProductModel extends Model<IProduct> {
  isProductExists(id: string | Types.ObjectId): Promise<IProduct>;
}
