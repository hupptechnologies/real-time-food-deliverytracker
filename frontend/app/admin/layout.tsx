'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
	LayoutDashboard,
	MapPin,
	ChartBar,
	Users,
	Store,
	Bike,
	Menu,
	X,
} from 'lucide-react';
import AdminHeader from './_components/Header';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const navigation = [
		{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
		{ name: 'Restaurants', href: '/admin/restaurants', icon: Store },
		{ name: 'Drivers', href: '/admin/drivers', icon: Bike },
		{ name: 'Customers', href: '/admin/customers', icon: Users },
		{ name: 'Delivery Zones', href: '/admin/zones', icon: MapPin },
		{ name: 'Analytics', href: '/admin/analytics', icon: ChartBar },
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile sidebar toggle */}
			<div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
				<Link href="/admin" className="flex items-center space-x-2">
					<Store className="h-8 w-8 text-red-500" />
					<span className="text-xl font-bold">DeliveryGo</span>
				</Link>
				<button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
				>
					{isSidebarOpen ? (
						<X className="h-6 w-6" />
					) : (
						<Menu className="h-6 w-6" />
					)}
				</button>
			</div>

			{/* Sidebar */}
			<div
				className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-white ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-200 ease-in-out lg:translate-x-0`}
			>
				<div className="flex h-full flex-col">
					{/* Sidebar header */}
					<div className="flex h-16 items-center border-b px-6">
						<Link href="/admin" className="flex items-center space-x-2">
							<Store className="h-8 w-8 text-red-500" />
							<span className="text-xl font-bold">DeliveryGo</span>
						</Link>
					</div>

					{/* Navigation */}
					<nav className="flex-1 space-y-1 px-4 py-4">
						{navigation.map((item) => {
							const Icon = item.icon;
							return (
								<Link
									key={item.name}
									href={item.href}
									className="flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
								>
									<Icon className="mr-3 h-5 w-5" />
									{item.name}
								</Link>
							);
						})}
					</nav>
				</div>
			</div>

			{/* Main content */}
			<div className="lg:pl-64">
				<AdminHeader />
				<main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
			</div>
		</div>
	);
}
