'use client';

import { Store, Bike, Users, Package } from 'lucide-react';

export default function AdminDashboard() {
	const stats = [
		{ name: 'Total Orders', value: '2,345', icon: Package, trend: '+12%' },
		{ name: 'Active Restaurants', value: '156', icon: Store, trend: '+5%' },
		{ name: 'Active Drivers', value: '89', icon: Bike, trend: '+8%' },
		{ name: 'Total Customers', value: '12.5k', icon: Users, trend: '+15%' },
	];

	const recentOrders = [
		{
			id: 'ORD-001',
			customer: 'John Doe',
			restaurant: 'Pizza Palace',
			status: 'Delivered',
			amount: '$35.99',
			time: '10 mins ago',
		},
		{
			id: 'ORD-002',
			customer: 'Jane Smith',
			restaurant: 'Burger House',
			status: 'In Transit',
			amount: '$28.50',
			time: '15 mins ago',
		},
		{
			id: 'ORD-003',
			customer: 'Mike Johnson',
			restaurant: 'Sushi Master',
			status: 'Preparing',
			amount: '$42.75',
			time: '20 mins ago',
		},
	];

	return (
		<div className="space-y-6">
			<div className="sm:flex sm:items-center sm:justify-between">
				<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
				<div className="mt-3 sm:ml-4 sm:mt-0">
					<button className="inline-flex items-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
						Download Report
					</button>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<div
							key={stat.name}
							className="overflow-hidden rounded-lg bg-white shadow"
						>
							<div className="p-5">
								<div className="flex items-center">
									<div className="flex-shrink-0">
										<Icon className="h-6 w-6 text-gray-400" />
									</div>
									<div className="ml-5 w-0 flex-1">
										<dl>
											<dt className="truncate text-sm font-medium text-gray-500">
												{stat.name}
											</dt>
											<dd className="flex items-baseline">
												<div className="text-2xl font-semibold text-gray-900">
													{stat.value}
												</div>
												<div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
													{stat.trend}
												</div>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div className="rounded-lg bg-white shadow">
				<div className="border-b border-gray-200 px-4 py-5 sm:px-6">
					<h3 className="text-lg font-medium leading-6 text-gray-900">
						Recent Orders
					</h3>
				</div>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
									Order ID
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
									Customer
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
									Restaurant
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
									Status
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
									Amount
								</th>
								<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
									Time
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{recentOrders.map((order) => (
								<tr key={order.id}>
									<td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
										{order.id}
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{order.customer}
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{order.restaurant}
									</td>
									<td className="whitespace-nowrap px-6 py-4">
										<span
											className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
												order.status === 'Delivered'
													? 'bg-green-100 text-green-800'
													: order.status === 'In Transit'
														? 'bg-yellow-100 text-yellow-800'
														: 'bg-blue-100 text-blue-800'
											}`}
										>
											{order.status}
										</span>
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{order.amount}
									</td>
									<td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
										{order.time}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
