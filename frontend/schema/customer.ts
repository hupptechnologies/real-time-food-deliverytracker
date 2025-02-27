import { z } from 'zod';

export const addCustomerSchema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email format' }),
	role: z
		.number()
		.int()
		.refine((val) => val === undefined || [1, 2, 3, 4].includes(val!)),
});

export type addCustomerSchemaType = z.infer<typeof addCustomerSchema>;
