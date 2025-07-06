import { z } from 'zod';

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  stock: z.number(),
  imageUrl: z.string().optional(),
  size: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Product = z.infer<typeof productSchema>;
