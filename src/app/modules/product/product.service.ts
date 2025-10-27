import httpStatus from "http-status";
import AppError from "../../errors/appError";
import Product from "./product.model";
import { IProduct } from "./product.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import mongoose from "mongoose";
import { Order } from "../order/order.model";

const createProduct = async (payload: IProduct): Promise<IProduct> => {
  const isExists = await Product.findOne({ name: payload.name });
  if (isExists) {
    throw new AppError(httpStatus.CONFLICT, "Product already exists");
  }

  const product = await Product.create(payload);
  return product;
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(["name", "category"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return { result, meta };
};

const getProductById = async (id: string): Promise<IProduct> => {
  const product = await Product.isProductExists(id);
  return product;
};

const updateProduct = async (
  id: string,
  updateData: Partial<IProduct>
): Promise<IProduct> => {
  const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  return updatedProduct;
};

const deleteProduct = async (id: string) => {
  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
};

export const getCustomersByOrderedProduct = async (productId: string) => {
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid product ID");
  }

  const customers = await Order.aggregate([
    { $match: { "items.product_id": new mongoose.Types.ObjectId(productId) } },
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customer_info",
      },
    },
    { $unwind: "$customer_info" },
    {
      $group: {
        _id: "$customer_id",
        name: { $first: "$customer_info.name" },
        email: { $first: "$customer_info.email" },
        membership: { $first: "$customer_info.membership" },
      },
    },
    { $sort: { name: 1 } },
  ]);

  if (!customers || customers.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No customers found for this product"
    );
  }

  return customers;
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCustomersByOrderedProduct,
};
