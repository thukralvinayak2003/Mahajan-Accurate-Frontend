import { z } from "zod";
import { productSchema } from "./product.schema";

export const orderItemSchema = z.object({
  id: z.string(),
  orderId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  price: z.number(),
  product: productSchema.optional(),
});

export type OrderItem = z.infer<typeof orderItemSchema>;
