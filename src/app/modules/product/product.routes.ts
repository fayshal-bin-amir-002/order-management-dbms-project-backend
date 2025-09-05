import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import auth from "../../middleware/auth";
import { ProductController } from "./product.controller";
import {
  productCreateValidation,
  productUpdateValidation,
} from "./product.validation";
import { Role } from "../customer/customer.interface";

const router = Router();

router.post(
  "/",
  auth(Role.ADMIN),
  validateRequest(productCreateValidation),
  ProductController.createProduct
);

router.get("/", ProductController.getAllProducts);

router.get("/:id", ProductController.getProductById);

router.patch(
  "/:id",
  auth(Role.ADMIN),
  validateRequest(productUpdateValidation),
  ProductController.updateProduct
);

router.delete("/:id", auth(Role.ADMIN), ProductController.deleteProduct);

router.get(
  "/customers/:id",
  auth(Role.ADMIN),
  ProductController.getCustomersByOrderedProduct
);

export const ProductRoutes = router;
