import { z } from 'zod';

export const RoleEnum = z.enum(['USER', 'ADMIN']);

export const userSchema = z.object({
  id: z.string(),
  phoneNumber: z.string(),
  password: z.string(), // Exclude this on frontend if needed
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  role: RoleEnum.default('USER'),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastLogin: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
