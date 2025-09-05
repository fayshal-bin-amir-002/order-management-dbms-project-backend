import { z } from "zod";

export const orderCreateValidation = z.object({
  body: z.object({
    customer_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
      message: "Invalid customer_id ObjectId",
    }),
    items: z
      .array(
        z.object({
          product_id: z.string().regex(/^[0-9a-fA-F]{24}$/, {
            message: "Invalid product_id ObjectId",
          }),
          quantity: z.number().int().positive({
            message: "Quantity must be a positive integer",
          }),
        })
      )
      .nonempty({ message: "At least one item is required" }),
    status: z
      .enum(["pending", "shipped", "delivered", "cancelled"])
      .default("pending"),
    ordered_at: z
      .string()
      .datetime()
      .default(() => new Date().toISOString()),
  }),
});

export const orderUpdateStatusValidation = z.object({
  body: z.object({
    status: z.enum(["pending", "shipped", "delivered", "cancelled"], {
      errorMap: () => ({ message: "Invalid order status" }),
    }),
  }),
});

export const orderUpdateItemValidation = z.object({
  body: z.object({
    quantity: z.number().int().positive({
      message: "Quantity must be a positive integer",
    }),
  }),
});
