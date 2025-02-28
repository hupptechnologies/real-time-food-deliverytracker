import { z } from 'zod';

export const addCustomerSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email format' }),
	role: z.number().int(),
});

export type addCustomerSchemaType = z.infer<typeof addCustomerSchema>;

export const roleSchema = z.object({
	name: z.string().min(1, { message: 'Role name is required' }),
	description: z.string().max(50).optional(),
});

export type roleSchemaType = z.infer<typeof roleSchema>;
