'use client';

import {
	ClipboardList,
	UtensilsCrossed,
	DollarSign,
	Star,
	ChevronUp,
	ChevronDown,
	MoreHorizontal,
} from 'lucide-react';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function RestaurantDashboard() {
	// Mock statistics data
	const stats = [
		{
			name: 'Total Orders',
			value: '156',
			icon: ClipboardList,
			change: '+12%',
			changeType: 'positive',
		},
		{
			name: 'Menu Items',
			value: '48',
			icon: UtensilsCrossed,
			change: '+3',
			changeType: 'positive',
		},
		{
			name: "Today's Revenue",
			value: '$1,459',
			icon: DollarSign,
			change: '+18.5%',
			changeType: 'positive',
		},
		{
			name: 'Average Rating',
			value: '4.8',
			icon: Star,
			change: '+0.2',
			changeType: 'positive',
		},
	];

	// Mock recent orders
	const recentOrders = [
		{
			id: 'ORD-001',
			customer: 'John Doe',
			items: ['2x Margherita Pizza', '1x Garlic Bread'],
			status: 'Preparing',
			total: '$35.99',
			time: '10 mins ago',
		},
		{
			id: 'ORD-002',
			customer: 'Jane Smith',
			items: ['1x Pepperoni Pizza', '2x Coke'],
			status: 'Ready',
			total: '$28.50',
			time: '15 mins ago',
		},
		{
			id: 'ORD-003',
			customer: 'Mike Johnson',
			items: ['1x Vegetarian Pizza', '1x Caesar Salad'],
			status: 'Delivered',
			total: '$42.75',
			time: '20 mins ago',
		},
		{
			id: 'ORD-004',
			customer: 'Sarah Wilson',
			items: ['2x Hawaiian Pizza', '1x Cheesy Fries'],
			status: 'Preparing',
			total: '$45.50',
			time: '25 mins ago',
		},
		{
			id: 'ORD-005',
			customer: 'Tom Brown',
			items: ['1x Supreme Pizza', '1x Wings'],
			status: 'Delivered',
			total: '$38.25',
			time: '35 mins ago',
		},
	];

	// Helper function to get status badge variant
	const getStatusBadgeVariant = (status: string) => {
		switch (status.toLowerCase()) {
			case 'preparing':
				return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800';
			case 'ready':
				return 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800';
			case 'delivered':
				return 'bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800';
			default:
				return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800';
		}
	};

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="sm:flex sm:items-center sm:justify-between">
				<h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
				<div className="mt-3 sm:ml-4 sm:mt-0">
					<Button className="bg-red-500 hover:bg-red-600">
						View Full Report
					</Button>
				</div>
			</div>

			{/* Stats grid */}
			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => {
					const Icon = stat.icon;
					return (
						<Card key={stat.name}>
							<CardContent className="p-6">
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
													{stat.change}
													{stat.changeType === 'positive' ? (
														<ChevronUp className="ml-0.5 h-4 w-4" />
													) : (
														<ChevronDown className="ml-0.5 h-4 w-4" />
													)}
												</div>
											</dd>
										</dl>
									</div>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</div>

			{/* Recent orders */}
			<Card>
				<CardHeader>
					<CardTitle>Recent Orders</CardTitle>
					<CardDescription>
						Overview of the latest orders and their status
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Order ID</TableHead>
								<TableHead>Customer</TableHead>
								<TableHead>Items</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Total</TableHead>
								<TableHead>Time</TableHead>
								<TableHead className="text-right">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{recentOrders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.id}</TableCell>
									<TableCell>{order.customer}</TableCell>
									<TableCell>
										<ul className="list-inside list-disc">
											{order.items.map((item, index) => (
												<li key={index} className="text-sm text-gray-600">
													{item}
												</li>
											))}
										</ul>
									</TableCell>
									<TableCell>
										<Badge
											className={`${getStatusBadgeVariant(order.status)} select-none`}
										>
											{order.status}
										</Badge>
									</TableCell>
									<TableCell>{order.total}</TableCell>
									<TableCell>{order.time}</TableCell>
									<TableCell className="text-right">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" className="h-8 w-8 p-0">
													<span className="sr-only">Open menu</span>
													<MoreHorizontal className="h-4 w-4" />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuItem>View details</DropdownMenuItem>
												<DropdownMenuItem>Update status</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem>Contact customer</DropdownMenuItem>
												<DropdownMenuItem className="text-red-600">
													Cancel order
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>

			{/* Performance Metrics */}
			<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
				{/* Popular Items */}
				<Card>
					<CardHeader>
						<CardTitle>Popular Items</CardTitle>
						<CardDescription>Most ordered items this week</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ name: 'Margherita Pizza', orders: 145, revenue: '$2,175' },
								{ name: 'Pepperoni Pizza', orders: 98, revenue: '$1,470' },
								{ name: 'Garlic Bread', orders: 67, revenue: '$335' },
								{ name: 'Caesar Salad', orders: 54, revenue: '$432' },
							].map((item, index) => (
								<div key={index} className="flex items-center justify-between">
									<div>
										<p className="font-medium">{item.name}</p>
										<p className="text-sm text-gray-500">
											{item.orders} orders
										</p>
									</div>
									<p className="font-medium text-green-600">{item.revenue}</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Peak Hours */}
				<Card>
					<CardHeader>
						<CardTitle>Peak Hours</CardTitle>
						<CardDescription>Busiest hours of operation</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-4">
							{[
								{ time: '12:00 PM - 1:00 PM', orders: 45, percentage: '85%' },
								{ time: '7:00 PM - 8:00 PM', orders: 38, percentage: '72%' },
								{ time: '6:00 PM - 7:00 PM', orders: 35, percentage: '65%' },
								{ time: '1:00 PM - 2:00 PM', orders: 28, percentage: '52%' },
							].map((hour, index) => (
								<div key={index} className="space-y-2">
									<div className="flex justify-between text-sm">
										<span>{hour.time}</span>
										<span>{hour.orders} orders</span>
									</div>
									<div className="h-2 w-full rounded-full bg-gray-200">
										<div
											className="h-2 rounded-full bg-red-500"
											style={{ width: hour.percentage }}
										/>
									</div>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
