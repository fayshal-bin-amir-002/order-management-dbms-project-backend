import { Schema, Types, model } from "mongoose";
import { IProduct, ProductModel } from "./product.interface";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const productSchema = new Schema<IProduct, ProductModel>(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

productSchema.statics.isProductExists = async function (
  id: string | Types.ObjectId
): Promise<IProduct> {
  const product = await this.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found!");
  }
  return product;
};

const Product = model<IProduct, ProductModel>("Product", productSchema);

export default Product;
