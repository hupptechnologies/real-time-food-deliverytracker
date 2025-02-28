import React from 'react';
import { getServerSession } from 'next-auth';
import RolesTable from './_components/RolesTable';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Role } from '@/types/customer';
import { AddRoleDialog } from './_components/AddRoleDialog';

const fetchRoles = async (token: string): Promise<Role[]> => {
	try {
		const baseUrl = process.env.NEXT_API_URL;
		if (!baseUrl) {
			// eslint-disable-next-line no-console
			console.log('### API URL not found ###');
			throw new Error('Failed to fetch roles');
		}

		const response = await fetch(`${baseUrl}/roles`, {
			method: 'GET',
			headers: {
				Authorization: `Barear ${token}`,
				'Content-Type': 'application/json',
			},
			cache: 'force-cache',
		});

		if (!response.ok) {
			throw new Error('Failed to fetch roles!');
		}

		const responseData = await response.json();

		if (!responseData.success) {
			const errorMessage = responseData?.message || 'Failed to fetch roles!';
			throw new Error(errorMessage);
		}

		return responseData.data;
	} catch (error: any) {
		// eslint-disable-next-line no-console
		console.error('### Error ###', error);
		throw new Error(error?.message || error);
	}
};

export default async function RolesPage() {
	const session = await getServerSession(authOptions);

	if (!session || !session?.accessToken) {
		return <p>Not authenticated</p>;
	}

	const roles: Role[] = await fetchRoles(session.accessToken);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-gray-900">User Roles</h1>
				<AddRoleDialog />
			</div>
			<RolesTable roles={roles} />
		</div>
	);
}
