'use client';

import Link from 'next/link';
import { Store, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MobileHeader({
	isSidebarOpen,
	setIsSidebarOpen,
}: {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (_open: boolean) => void;
}) {
	return (
		<div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between border-b bg-card px-4 py-3 lg:hidden">
			<Link href="/admin" className="flex items-center space-x-2">
				<Store className="h-8 w-8 text-primary" />
				<span className="text-xl font-bold">DeliveryGo</span>
			</Link>
			<Button
				variant="ghost"
				size="icon"
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
				aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
			>
				{isSidebarOpen ? (
					<X className="h-6 w-6" />
				) : (
					<Menu className="h-6 w-6" />
				)}
			</Button>
		</div>
	);
}
