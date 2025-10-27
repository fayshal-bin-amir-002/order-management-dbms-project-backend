import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CustomerRoutes } from "../modules/customer/customer.routes";
import { ProductRoutes } from "../modules/product/product.routes";
import { OrderRoutes } from "../modules/order/order.route";
import { DeliveryRoutes } from "../modules/delivery/delivery.route";
import { AdminDashboardRoutes } from "../modules/dashboard/dashboard.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/customer",
    route: CustomerRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/delivery",
    route: DeliveryRoutes,
  },
  {
    path: "/dashboard",
    route: AdminDashboardRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
