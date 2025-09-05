import mongoose from "mongoose";
import httpStatus from "http-status";
import AppError from "../../errors/appError";
import { Order } from "./order.model";
import { IOrder } from "./order.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import Product from "../product/product.model";
import Customer from "../customer/customer.model";
import { Delivery } from "../delivery/delivery.model";

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await Customer.findById(payload.customer_id).session(session);
    if (!user) {
      throw new AppError(httpStatus.BAD_REQUEST, "Customer not found!");
    }

    for (const item of payload.items) {
      const product = await Product.findById(item.product_id).session(session);
      if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found");
      }
      if (product.stock < item.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Not enough stock available"
        );
      }
      product.stock -= item.quantity;
      await product.save({ session });
    }

    const order = await Order.create([payload], { session });

    await Delivery.create(
      [
        {
          order_id: order[0]._id,
          delivered: false,
          date: null,
          shipping_method: null,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(["status"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const filter = orderQuery.modelQuery.getFilter();

  const ordersWithDetails = await Order.aggregate([
    { $match: filter },

    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customer_info",
      },
    },
    { $unwind: { path: "$customer_info", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "deliveries",
        localField: "_id",
        foreignField: "order_id",
        as: "delivery_info",
      },
    },
    { $unwind: { path: "$delivery_info", preserveNullAndEmptyArrays: true } },

    {
      $lookup: {
        from: "products",
        localField: "items.product_id",
        foreignField: "_id",
        as: "product_details",
      },
    },

    { $sort: orderQuery.modelQuery.getOptions().sort || { createdAt: -1 } },
    { $skip: orderQuery.modelQuery.getOptions().skip || 0 },
    { $limit: orderQuery.modelQuery.getOptions().limit || 20 },
  ]);

  const meta = await orderQuery.countTotal();

  return { result: ordersWithDetails, meta };
};

const getOrdersByCustomer = async (customerId: string) => {
  const ordersWithDelivery = await Order.aggregate([
    { $match: { customer_id: new mongoose.Types.ObjectId(customerId) } },

    {
      $lookup: {
        from: "products",
        localField: "items.product_id",
        foreignField: "_id",
        as: "product_details",
      },
    },

    {
      $lookup: {
        from: "deliveries",
        localField: "_id",
        foreignField: "order_id",
        as: "delivery_info",
      },
    },
    { $unwind: { path: "$delivery_info", preserveNullAndEmptyArrays: true } },

    { $sort: { createdAt: -1 } },
  ]);

  if (!ordersWithDelivery || ordersWithDelivery.length === 0) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "No orders found for this customer"
    );
  }

  return ordersWithDelivery;
};

const getOrderById = async (id: string): Promise<IOrder> => {
  const order = await Order.findById(id).populate(
    "customer_id items.product_id"
  );
  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }
  return order;
};

const updateOrderStatus = async (
  id: string,
  status: string
): Promise<IOrder> => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true, runValidators: true }
  );

  if (!updatedOrder) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  return updatedOrder;
};

const deleteOrder = async (id: string) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const order = await Order.findById(id).session(session);

    if (!order) {
      throw new AppError(httpStatus.NOT_FOUND, "Order not found");
    }

    if (order.status !== "cancelled") {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Only cancelled orders can be deleted"
      );
    }

    await Order.findByIdAndDelete(id).session(session);
    await Delivery.deleteMany({ order_id: id }).session(session);

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getOrdersByCustomer,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
};
