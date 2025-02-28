import { getServerSession } from 'next-auth';
import { Users, User, DollarSign, Star } from 'lucide-react';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomerStats from './_components/CustomerStats';
import CustomersTable from './_components/CustomersTable';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AddCustomerDialog } from './_components/AddCustomerDialog';
import { Customer, Role } from '@/types/customer';

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

const fetchCustomers = async (token: string): Promise<Customer[]> => {
	try {
		const baseUrl = process.env.NEXT_API_URL;
		if (!baseUrl) {
			// eslint-disable-next-line no-console
			console.log('### API URL not found ###');
			throw new Error('Failed to fetch customers');
		}

		const response = await fetch(`${baseUrl}/users`, {
			method: 'GET',
			headers: {
				Authorization: `Barear ${token}`,
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			throw new Error('Failed to fetch customers!');
		}

		const responseData = await response.json();

		if (!responseData.success) {
			const errorMessage =
				responseData?.message || 'Failed to fetch customers!';
			throw new Error(errorMessage);
		}

		return responseData.data;
	} catch (error: any) {
		// eslint-disable-next-line no-console
		console.error('### Error ###', error);
		throw new Error(error?.message || error);
	}
};

export default async function CustomersPage() {
	const session = await getServerSession(authOptions);

	if (!session || !session?.accessToken) {
		return <p>Not authenticated</p>;
	}

	const customers: Customer[] = await fetchCustomers(session.accessToken);
	const roles: Role[] = await fetchRoles(session.accessToken);
	const stats = [
		{
			name: 'Total Customers',
			value: '12,456',
			icon: Users,
			change: '+15%',
			changeType: 'positive',
		},
		{
			name: 'New This Month',
			value: '842',
			icon: User,
			change: '+7.2%',
			changeType: 'positive',
		},
		{
			name: 'Active Customers',
			value: '8,721',
			icon: Star,
			change: '+3.1%',
			changeType: 'positive',
		},
		{
			name: 'Avg. Order Value',
			value: '$32.50',
			icon: DollarSign,
			change: '-2.3%',
			changeType: 'negative',
		},
	];

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
				<AddCustomerDialog roles={roles} />
			</div>

			{/* Stats cards */}
			<CustomerStats stats={stats} />

			{/* Customer acquisition chart */}
			<Card>
				<CardHeader>
					<CardTitle>Customer Acquisition</CardTitle>
					<CardDescription>
						Track new customer sign-ups over time
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="monthly">
						<TabsList className="mb-4">
							<TabsTrigger value="weekly">Weekly</TabsTrigger>
							<TabsTrigger value="monthly">Monthly</TabsTrigger>
							<TabsTrigger value="yearly">Yearly</TabsTrigger>
						</TabsList>
						<div className="mt-4">
							<TabsContent value="weekly">
								<div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
									<p className="text-gray-500">
										Weekly acquisition chart would be displayed here
									</p>
								</div>
							</TabsContent>
							<TabsContent value="monthly">
								<div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
									<p className="text-gray-500">
										Monthly acquisition chart would be displayed here
									</p>
								</div>
							</TabsContent>
							<TabsContent value="yearly">
								<div className="flex h-64 items-center justify-center rounded-lg bg-gray-50">
									<p className="text-gray-500">
										Yearly acquisition chart would be displayed here
									</p>
								</div>
							</TabsContent>
						</div>
					</Tabs>
				</CardContent>
			</Card>

			<CustomersTable customers={customers} roles={roles} />
		</div>
	);
}
