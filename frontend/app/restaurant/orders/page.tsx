'use client';

import { useState } from 'react';
import {
	Search,
	Filter,
	Clock,
	Phone,
	Mail,
	MapPin,
	MoreHorizontal,
	Plus,
	ArrowUpDown,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function OrdersPage() {
	const [searchTerm, setSearchTerm] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	const [sortBy, setSortBy] = useState('recent');

	// Mock orders data
	const orders = [
		{
			id: 'ORD-001',
			customer: {
				name: 'John Doe',
				phone: '+1 (555) 123-4567',
				email: 'john.doe@example.com',
				address: '123 Main St, Apt 4B, New York, NY 10001',
			},
			items: [
				{ name: 'Margherita Pizza', quantity: 2, price: '$15.99' },
				{ name: 'Garlic Bread', quantity: 1, price: '$4.99' },
			],
			status: 'Preparing',
			total: '$36.97',
			paymentMethod: 'Credit Card',
			orderTime: '2024-03-20 14:30:00',
			deliveryTime: '30-40 mins',
			notes: 'Extra cheese please',
		},
		{
			id: 'ORD-002',
			customer: {
				name: 'Jane Smith',
				phone: '+1 (555) 234-5678',
				email: 'jane.smith@example.com',
				address: '456 Park Ave, New York, NY 10002',
			},
			items: [
				{ name: 'Pepperoni Pizza', quantity: 1, price: '$17.99' },
				{ name: 'Caesar Salad', quantity: 1, price: '$8.99' },
				{ name: 'Coke', quantity: 2, price: '$2.99' },
			],
			status: 'Ready',
			total: '$32.97',
			paymentMethod: 'PayPal',
			orderTime: '2024-03-20 14:15:00',
			deliveryTime: '15-25 mins',
			notes: 'No onions in salad',
		},
		{
			id: 'ORD-003',
			customer: {
				name: 'Mike Johnson',
				phone: '+1 (555) 345-6789',
				email: 'mike.j@example.com',
				address: '789 Broadway, New York, NY 10003',
			},
			items: [
				{ name: 'Supreme Pizza', quantity: 1, price: '$19.99' },
				{ name: 'Buffalo Wings', quantity: 2, price: '$12.99' },
			],
			status: 'Delivered',
			total: '$45.97',
			paymentMethod: 'Cash',
			orderTime: '2024-03-20 13:45:00',
			deliveryTime: 'Delivered at 14:15',
			notes: 'Extra spicy wings',
		},
	];

	const filteredOrders = orders
		.filter((order) => {
			const matchesSearch =
				order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				order.customer.phone.includes(searchTerm);

			const matchesStatus =
				filterStatus === 'all' ||
				order.status.toLowerCase() === filterStatus.toLowerCase();

			return matchesSearch && matchesStatus;
		})
		.sort((a, b) => {
			switch (sortBy) {
				case 'total':
					return (
						parseFloat(b.total.replace('$', '')) -
						parseFloat(a.total.replace('$', ''))
					);
				case 'recent':
				default:
					return (
						new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime()
					);
			}
		});

	const getStatusBadgeVariant = (status: string) => {
		switch (status.toLowerCase()) {
			case 'preparing':
				return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800';
			case 'ready':
				return 'bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800';
			case 'delivered':
				return 'bg-blue-100 text-blue-800 hover:bg-blue-100 hover:';
			case 'cancelled':
				return 'bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800';
			default:
				return 'bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800';
		}
	};

	return (
		<div className="space-y-6">
			{/* Page header */}
			<div className="sm:flex sm:items-center sm:justify-between">
				<h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
				<div className="mt-4 flex space-x-3 sm:mt-0">
					<Button variant="outline">Export Orders</Button>
					<Button className="bg-red-500 hover:bg-red-600">
						<Plus className="mr-2 h-4 w-4" />
						Create Order
					</Button>
				</div>
			</div>

			{/* Filters and Search */}
			<Card>
				<CardContent className="p-6">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<Input
								placeholder="Search orders..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-9"
							/>
						</div>

						<Select value={filterStatus} onValueChange={setFilterStatus}>
							<SelectTrigger>
								<div className="flex items-center">
									<Filter className="mr-2 h-4 w-4 text-gray-400" />
									<SelectValue placeholder="Filter by status" />
								</div>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Orders</SelectItem>
								<SelectItem value="preparing">Preparing</SelectItem>
								<SelectItem value="ready">Ready</SelectItem>
								<SelectItem value="delivered">Delivered</SelectItem>
								<SelectItem value="cancelled">Cancelled</SelectItem>
							</SelectContent>
						</Select>

						<Select value={sortBy} onValueChange={setSortBy}>
							<SelectTrigger>
								<div className="flex items-center">
									<ArrowUpDown className="mr-2 h-4 w-4 text-gray-400" />
									<SelectValue placeholder="Sort by" />
								</div>
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="recent">Most Recent</SelectItem>
								<SelectItem value="total">Total Amount</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Orders Table */}
			<Card>
				<CardContent className="p-0">
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
							{filteredOrders.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.id}</TableCell>
									<TableCell>
										<div>
											<p className="font-medium">{order.customer.name}</p>
											<p className="text-sm text-gray-500">
												{order.customer.phone}
											</p>
										</div>
									</TableCell>
									<TableCell>
										<ul className="list-inside list-disc">
											{order.items.map((item, index) => (
												<li key={index} className="text-sm text-gray-600">
													{item.quantity}x {item.name}
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
									<TableCell>
										<div>
											<p className="text-sm text-gray-900">
												{new Date(order.orderTime).toLocaleTimeString()}
											</p>
											<p className="text-sm text-gray-500">
												{order.deliveryTime}
											</p>
										</div>
									</TableCell>
									<TableCell className="text-right">
										<Dialog>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="h-8 w-8 p-0">
														<span className="sr-only">Open menu</span>
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DialogTrigger asChild>
														<DropdownMenuItem>View details</DropdownMenuItem>
													</DialogTrigger>
													<DropdownMenuItem>Update status</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem>Print receipt</DropdownMenuItem>
													<DropdownMenuItem className="text-red-600">
														Cancel order
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>

											{/* Order Details Dialog */}
											<DialogContent className="max-w-2xl">
												<DialogHeader>
													<DialogTitle>Order Details - {order.id}</DialogTitle>
													<DialogDescription>
														Complete information about the order
													</DialogDescription>
												</DialogHeader>
												<Tabs defaultValue="details" className="mt-4">
													<TabsList>
														<TabsTrigger value="details">
															Order Details
														</TabsTrigger>
														<TabsTrigger value="customer">
															Customer Info
														</TabsTrigger>
														<TabsTrigger value="timeline">Timeline</TabsTrigger>
													</TabsList>
													<TabsContent value="details" className="space-y-4">
														<div className="grid grid-cols-2 gap-4">
															<div>
																<h4 className="font-medium text-gray-900">
																	Order Items
																</h4>
																<ul className="mt-2 space-y-2">
																	{order.items.map((item, index) => (
																		<li
																			key={index}
																			className="flex justify-between text-sm"
																		>
																			<span>
																				{item.quantity}x {item.name}
																			</span>
																			<span className="text-gray-600">
																				{item.price}
																			</span>
																		</li>
																	))}
																</ul>
																<div className="mt-4 border-t pt-4">
																	<div className="flex justify-between font-medium">
																		<span>Total</span>
																		<span>{order.total}</span>
																	</div>
																</div>
															</div>
															<div>
																<h4 className="font-medium text-gray-900">
																	Order Information
																</h4>
																<dl className="mt-2 space-y-2">
																	<div>
																		<dt className="text-sm text-gray-500">
																			Payment Method
																		</dt>
																		<dd className="text-sm font-medium">
																			{order.paymentMethod}
																		</dd>
																	</div>
																	<div>
																		<dt className="text-sm text-gray-500">
																			Order Time
																		</dt>
																		<dd className="text-sm font-medium">
																			{new Date(
																				order.orderTime,
																			).toLocaleString()}
																		</dd>
																	</div>
																	<div>
																		<dt className="text-sm text-gray-500">
																			Delivery Time
																		</dt>
																		<dd className="text-sm font-medium">
																			{order.deliveryTime}
																		</dd>
																	</div>
																	<div>
																		<dt className="text-sm text-gray-500">
																			Notes
																		</dt>
																		<dd className="text-sm font-medium">
																			{order.notes}
																		</dd>
																	</div>
																</dl>
															</div>
														</div>
													</TabsContent>
													<TabsContent value="customer" className="space-y-4">
														<div className="space-y-4">
															<div className="flex items-center space-x-4">
																<div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
																	<span className="text-lg font-medium text-gray-600">
																		{order.customer.name.charAt(0)}
																	</span>
																</div>
																<div>
																	<h4 className="font-medium text-gray-900">
																		{order.customer.name}
																	</h4>
																	<p className="text-sm text-gray-500">
																		Regular Customer
																	</p>
																</div>
															</div>
															<div className="space-y-3">
																<div className="flex items-center text-sm">
																	<Phone className="mr-2 h-4 w-4 text-gray-400" />
																	{order.customer.phone}
																</div>
																<div className="flex items-center text-sm">
																	<Mail className="mr-2 h-4 w-4 text-gray-400" />
																	{order.customer.email}
																</div>
																<div className="flex items-start text-sm">
																	<MapPin className="mr-2 mt-1 h-4 w-4 text-gray-400" />
																	{order.customer.address}
																</div>
															</div>
														</div>
													</TabsContent>
													<TabsContent value="timeline" className="space-y-4">
														<div className="space-y-6">
															<div className="flex items-center space-x-4">
																<div className="flex-none">
																	<div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
																		<Clock className="h-4 w-4 text-blue-600" />
																	</div>
																</div>
																<div className="flex-1">
																	<p className="text-sm font-medium text-gray-900">
																		Order Received
																	</p>
																	<p className="text-sm text-gray-500">
																		{new Date(order.orderTime).toLocaleString()}
																	</p>
																</div>
															</div>
														</div>
													</TabsContent>
												</Tabs>
											</DialogContent>
										</Dialog>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}
