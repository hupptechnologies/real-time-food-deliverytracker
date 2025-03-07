'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import {
	ChartBar,
	ClipboardList,
	CookingPot,
	HouseIcon,
	LogOut,
	Settings,
	User,
} from 'lucide-react';
import DashboardHeader from '@/components/DashboardHeader';
import MobileHeader from '@/components/MobileHeader';
import Sidebar from '@/components/Sidebar';
import { NavItemWithChildren } from '@/types/layout';

export default function RestaurantLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const navigation: NavItemWithChildren[] = [
		{ name: 'Home', href: '/restaurant', icon: HouseIcon },
		{ name: 'Orders', href: '/restaurant/orders', icon: CookingPot },
		{ name: 'Menu', href: '/restaurant/menu', icon: ClipboardList },
		{ name: 'Analytics', href: '/restaurant/analytics', icon: ChartBar },
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
								href: '/restaurant/profile',
								label: 'Profile',
								icon: User,
							},
							{
								type: 'link',
								href: '/restaurant/settings',
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
