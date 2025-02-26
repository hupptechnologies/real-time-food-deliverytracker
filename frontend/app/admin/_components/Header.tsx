'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, User, Settings, LogOut, ChevronRight, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';

export default function AdminHeader() {
	const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const pathname = usePathname();

	const notifications = [
		{
			id: 1,
			title: 'New Order #1234',
			description: 'Pizza Palace has a new order waiting for confirmation',
			time: '5 mins ago',
			unread: true,
		},
		{
			id: 2,
			title: 'Driver Update',
			description: 'John Smith is now available for deliveries',
			time: '10 mins ago',
			unread: true,
		},
		{
			id: 3,
			title: 'System Update',
			description: 'The system will undergo maintenance in 2 hours',
			time: '1 hour ago',
			unread: false,
		},
	];

	const generateBreadcrumbs = () => {
		const paths = pathname.split('/').filter(Boolean);
		return paths.map((path, index) => {
			const href = `/${paths.slice(0, index + 1).join('/')}`;
			return {
				name: path.charAt(0).toUpperCase() + path.slice(1),
				href,
				current: index === paths.length - 1,
			};
		});
	};

	const breadcrumbs = generateBreadcrumbs();

	const handleLogout = () => {
		signOut({ callbackUrl: '/' });
	};

	return (
		<header className="bg-white shadow-sm">
			<div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
				<nav className="flex" aria-label="Breadcrumb">
					<ol className="flex items-center space-x-4">
						{breadcrumbs.map((breadcrumb, index) => (
							<li key={breadcrumb.href}>
								<div className="flex items-center">
									{index !== 0 && (
										<ChevronRight className="h-5 w-5 flex-shrink-0 text-gray-400" />
									)}
									<Link
										href={breadcrumb.href}
										className={`ml-4 text-sm font-medium ${
											breadcrumb.current
												? 'text-gray-800'
												: 'text-gray-500 hover:text-gray-700'
										}`}
										aria-current={breadcrumb.current ? 'page' : undefined}
									>
										{breadcrumb.name}
									</Link>
								</div>
							</li>
						))}
					</ol>
				</nav>

				<div className="flex items-center space-x-4">
					<div className="relative">
						<Button
							variant="outline"
							size="icon"
							onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
							className="relative p-2 text-gray-400 hover:text-gray-500"
						>
							<Bell className="h-6 w-6" />
							<span className="absolute right-0 top-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
						</Button>

						{isNotificationsOpen && (
							<div className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="p-4">
									<div className="mb-4 flex items-center justify-between">
										<h2 className="text-lg font-medium text-gray-900">
											Notifications
										</h2>
										<button
											onClick={() => setIsNotificationsOpen(false)}
											className="text-gray-400 hover:text-gray-500"
										>
											<X className="h-5 w-5" />
										</button>
									</div>
									<div className="space-y-4">
										{notifications.map((notification) => (
											<div
												key={notification.id}
												className={`flex items-start ${
													notification.unread ? 'bg-blue-50' : ''
												} rounded-lg p-2`}
											>
												<div className="ml-3 flex-1">
													<p className="text-sm font-medium text-gray-900">
														{notification.title}
													</p>
													<p className="mt-1 text-sm text-gray-500">
														{notification.description}
													</p>
													<p className="mt-1 text-xs text-gray-400">
														{notification.time}
													</p>
												</div>
											</div>
										))}
									</div>
									<div className="mt-4 border-t border-gray-200 pt-4">
										<button className="w-full text-center text-sm text-blue-600 hover:text-blue-500">
											View all notifications
										</button>
									</div>
								</div>
							</div>
						)}
					</div>

					<div className="relative">
						<button
							onClick={() => setIsProfileOpen(!isProfileOpen)}
							className="flex items-center space-x-3 focus:outline-none"
						>
							<div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
								<span className="text-sm font-medium text-gray-600">A</span>
							</div>
						</button>

						{isProfileOpen && (
							<div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
								<div className="py-1">
									<Link
										href="/admin/profile"
										className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() => setIsProfileOpen(false)}
									>
										<User className="mr-3 h-4 w-4" />
										Profile
									</Link>
									<Link
										href="/admin/settings"
										className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={() => setIsProfileOpen(false)}
									>
										<Settings className="mr-3 h-4 w-4" />
										Settings
									</Link>
									<button
										className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										onClick={handleLogout}
									>
										<LogOut className="mr-3 h-4 w-4" />
										Logout
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</header>
	);
}
