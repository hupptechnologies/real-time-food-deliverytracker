/* eslint-disable no-console */
'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { roleSchema, roleSchemaType } from '@/schema/customer';

export async function UpdateRole({
	id,
	form,
}: {
	id: number;
	form: roleSchemaType;
}) {
	const { success, data } = roleSchema.safeParse(form);
	if (!success) {
		throw new Error('Invalid form data');
	}

	const session = await getServerSession(authOptions);
	console.log('### session ###', session);

	if (!session) {
		throw new Error('Unauthenticated!');
	}

	const token = session.accessToken;
	if (!token) {
		throw new Error('Unauthenticated!');
	}

	const baseUrl = process.env.NEXT_API_URL;
	const response = await fetch(`${baseUrl}/roles/${id}`, {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to update role!');
	}

	const responseData = await response.json();
	console.log('### responseData ###', responseData);

	if (!responseData.success) {
		const errorMessage = responseData?.message || 'Failed to update role!';
		throw new Error(errorMessage);
	}

	revalidatePath('/admin/roles');
}
