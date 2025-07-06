import { z } from "zod";
import { orderItemSchema } from "./orderItem.schema";

export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}
export const orderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  totalPrice: z.number(),
  status: z.nativeEnum(OrderStatus).default(OrderStatus.PENDING),
  shippingAddress: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  orderItems: z.array(orderItemSchema),
});

export type Order = z.infer<typeof orderSchema>;
