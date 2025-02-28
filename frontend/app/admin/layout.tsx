'use client';

import { useState } from 'react';
import AdminHeader from './_components/Header';
import Sidebar from './_components/Sidebar';
import MobileHeader from './_components/MobileHeader';

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Mobile header with menu toggle */}
			<MobileHeader
				isSidebarOpen={isSidebarOpen}
				setIsSidebarOpen={setIsSidebarOpen}
			/>

			{/* Sidebar component */}
			<Sidebar isMobileOpen={isSidebarOpen} setMobileOpen={setIsSidebarOpen} />

			{/* Main content */}
			<div className="lg:pl-64">
				<div className="hidden lg:block">
					<AdminHeader />
				</div>
				<main className="px-4 py-6 pt-16 sm:px-6 lg:px-8 lg:pt-8">
					{children}
				</main>
			</div>
		</div>
	);
}
