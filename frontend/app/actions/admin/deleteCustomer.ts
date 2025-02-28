/* eslint-disable no-console */
'use server';

import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function DeleteCustomer(id: number) {
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
	const response = await fetch(`${baseUrl}/users/${id}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		throw new Error('Failed to delete customer!');
	}

	const responseData = await response.json();
	console.log('### responseData ###', responseData);

	if (!responseData.success) {
		const errorMessage = responseData?.message || 'Failed to delete customer!';
		throw new Error(errorMessage);
	}

	revalidatePath('/admin/customers');
}
