// shared/zod/cart.schema.ts
import { z } from "zod";

export const cartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  productId: z.string(),
  quantity: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Cart = z.infer<typeof cartSchema>;
