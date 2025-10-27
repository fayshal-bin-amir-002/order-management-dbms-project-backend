import Customer from "../customer/customer.model";
import { Order } from "../order/order.model";
import Product from "../product/product.model";

const getAdminDashboardData = async () => {
  // ===== Basic Counts =====
  const [totalProducts, totalUsers] = await Promise.all([
    Product.countDocuments(),
    Customer.countDocuments(),
  ]);

  // ===== Order Statistics =====
  const orders = await Order.find()
    .populate("items.product_id", "price name")
    .populate("customer_id", "name membership");

  let totalSoldAmount = 0;
  let totalPendingAmount = 0;

  let totalOrders = 0;
  let pendingOrders = 0;
  let shippedOrders = 0;
  let deliveredOrders = 0;
  let cancelledOrders = 0;

  for (const order of orders) {
    totalOrders++;

    const orderTotal = order.items.reduce((sum, item) => {
      const product = item.product_id as any;
      const price = product?.price || 0;
      return sum + price * item.quantity;
    }, 0);

    switch (order.status) {
      case "pending":
        pendingOrders++;
        totalPendingAmount += orderTotal;
        break;
      case "shipped":
        shippedOrders++;
        break;
      case "delivered":
        deliveredOrders++;
        totalSoldAmount += orderTotal;
        break;
      case "cancelled":
        cancelledOrders++;
        break;
    }
  }

  const topSoldProducts = await Order.aggregate([
    { $match: { status: "delivered" } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $group: {
        _id: "$items.product_id",
        name: { $first: "$product.name" },
        category: { $first: "$product.category" },
        totalSoldQuantity: { $sum: "$items.quantity" },
        totalRevenue: {
          $sum: { $multiply: ["$items.quantity", "$product.price"] },
        },
      },
    },
    { $sort: { totalSoldQuantity: -1 } },
    { $limit: 5 },
  ]);

  const topBuyingCustomers = await Order.aggregate([
    { $match: { status: "delivered" } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "products",
        localField: "items.product_id",
        foreignField: "_id",
        as: "product",
      },
    },
    { $unwind: "$product" },
    {
      $group: {
        _id: "$customer_id",
        totalSpent: {
          $sum: { $multiply: ["$items.quantity", "$product.price"] },
        },
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    { $unwind: "$customer" },
    {
      $project: {
        _id: 0,
        customer_id: "$customer._id",
        name: "$customer.name",
        membership: "$customer.membership",
        totalSpent: 1,
      },
    },
    { $sort: { totalSpent: -1 } },
    { $limit: 5 },
  ]);

  return {
    counts: {
      totalProducts,
      totalUsers,
      totalOrders,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      cancelledOrders,
    },
    financials: {
      totalSoldAmount,
      totalPendingAmount,
    },
    topSoldProducts,
    topBuyingCustomers,
  };
};

export const AdminDashboardService = {
  getAdminDashboardData,
};
