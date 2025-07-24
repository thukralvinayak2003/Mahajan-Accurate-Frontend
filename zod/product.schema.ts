import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().default(""), // ✅ ensures empty string if missing
  price: z.number(),
  stock: z.number(),
  imageUrl: z.string().default(""), // ✅
  size: z.string().default(""), // ✅
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;
