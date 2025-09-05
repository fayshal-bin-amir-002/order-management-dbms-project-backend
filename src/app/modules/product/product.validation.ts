import { z } from "zod";

export const productCreateValidation = z.object({
  body: z.object({
    name: z.string().trim().min(2, {
      message: "Product name must be at least 2 characters long",
    }),
    price: z
      .number({ invalid_type_error: "Price must be a number" })
      .min(0, { message: "Price cannot be negative" }),
    stock: z
      .number({ invalid_type_error: "Stock must be a number" })
      .int({ message: "Stock must be an integer" })
      .min(0, { message: "Stock cannot be negative" }),
    category: z.string().trim().min(2, {
      message: "Category must be at least 2 characters long",
    }),
  }),
});

export const productUpdateValidation = z.object({
  body: z.object({
    name: z.string().trim().min(2).optional(),
    price: z.number().min(0).optional(),
    stock: z.number().int().min(0).optional(),
    category: z.string().trim().min(2).optional(),
  }),
});
