'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import {
	MapPin,
	ChartBar,
	Users,
	Store,
	Bike,
	Settings,
	HouseIcon,
	LogOut,
	User,
} from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import DashboardHeader from '@/components/DashboardHeader';
import { NavItemWithChildren } from '@/types/layout';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const navigation: NavItemWithChildren[] = [
		{ name: 'Home', href: '/admin', icon: HouseIcon },
		{ name: 'Restaurants', href: '/admin/restaurants', icon: Store },
		{ name: 'Drivers', href: '/admin/drivers', icon: Bike },
		{ name: 'Customers', href: '/admin/customers', icon: Users },
		{ name: 'Delivery Zones', href: '/admin/zones', icon: MapPin },
		{ name: 'Analytics', href: '/admin/analytics', icon: ChartBar },
		{
			name: 'System',
			href: '#',
			icon: Settings,
		},
	];

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile header with menu toggle */}
			<MobileHeader
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>

			{/* Sidebar component */}
			<Sidebar
				navigation={navigation}
				isMobileOpen={isSidebarOpen}
				setMobileOpen={setIsSidebarOpen}
			/>

			{/* Main content */}
			<div className="lg:pl-64">
				<div className="hidden lg:block">
					<DashboardHeader
						profileMenuItems={[
							{
								type: 'link',
								href: '/admin/profile',
								label: 'Profile',
								icon: User,
							},
							{
								type: 'link',
								href: '/admin/settings',
								label: 'Settings',
								icon: Settings,
							},
							{
								type: 'action',
								label: 'Logout',
								icon: LogOut,
								onClick: () => signOut({ callbackUrl: '/' }),
							},
						]}
					/>
				</div>
				<main className="px-4 py-6 pt-16 sm:px-6 lg:px-8 lg:pt-8">
					{children}
				</main>
			</div>
		</div>
	);
}
