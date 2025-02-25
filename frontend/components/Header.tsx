'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
	LuMenu,
	LuX,
	LuChevronDown,
	LuUser,
	LuLogOut,
	LuSettings,
	LuSearch,
	LuShoppingBag,
} from 'react-icons/lu';
import { signOut, useSession } from 'next-auth/react';

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	const handleLogout = () => {
		signOut();
	};

	const session = useSession();
	const isLoggedIn = session.status === 'authenticated';
	return (
		<header className="sticky top-0 z-50 bg-white shadow-sm">
			{/* Top Banner */}
			<div className="bg-red-500 py-2 text-sm text-white">
				<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
					Free delivery on orders above $30! 🚀
				</div>
			</div>

			<nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
				<div className="flex h-16 items-center justify-between">
					{/* Logo and Main Navigation */}
					<div className="flex items-center">
						<Link href="/" className="flex items-center space-x-2">
							<LuShoppingBag className="h-8 w-8 text-red-500" />
							<span className="text-xl font-bold text-gray-900">
								DeliveryGo
							</span>
						</Link>

						{/* Desktop Navigation */}
						<div className="ml-10 hidden space-x-8 md:flex">
							<Link
								href="/"
								className="text-base font-medium text-gray-500 hover:text-gray-900"
							>
								Home
							</Link>
							<div className="group relative">
								<button className="inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900">
									Restaurants
									<LuChevronDown className="ml-2 h-4 w-4" />
								</button>
								<div className="invisible absolute left-0 z-50 mt-2 w-48 rounded-md bg-white opacity-0 shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out group-hover:visible group-hover:opacity-100">
									<div className="py-1" role="menu">
										<Link
											href="/"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Nearby Restaurants
										</Link>
										<Link
											href="/"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Popular Places
										</Link>
										<Link
											href="/"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											New Arrivals
										</Link>
									</div>
								</div>
							</div>
							<Link
								href="/"
								className="text-base font-medium text-gray-500 hover:text-gray-900"
							>
								Offers
							</Link>
							<Link
								href="/"
								className="text-base font-medium text-gray-500 hover:text-gray-900"
							>
								Contact
							</Link>
						</div>
					</div>

					{/* Search Bar - Desktop */}
					<div className="mx-8 hidden max-w-lg flex-1 md:flex">
						<div className="relative w-full">
							<input
								type="text"
								placeholder="Search for restaurants or dishes..."
								className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
							/>
							<LuSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
						</div>
					</div>

					{/* Desktop Auth Buttons / Profile */}
					<div className="hidden items-center space-x-4 md:flex">
						{isLoggedIn ? (
							<div className="relative">
								<button
									onClick={() => setIsProfileOpen(!isProfileOpen)}
									className="flex items-center space-x-3 focus:outline-none"
								>
									<div className="h-8 w-8 overflow-hidden rounded-full bg-gray-200">
										<Image
											src="/images/home/user_avatar.png"
											alt="Profile"
											width={32}
											height={32}
											className="h-full w-full object-cover"
										/>
									</div>
									<LuChevronDown className="h-4 w-4 text-gray-500" />
								</button>

								{isProfileOpen && (
									<div className="absolute right-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
										<div className="py-1">
											<Link
												href="/"
												className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												<LuUser className="mr-3 h-4 w-4" />
												Profile
											</Link>
											<Link
												href="/"
												className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
											>
												<LuSettings className="mr-3 h-4 w-4" />
												Settings
											</Link>
											<button
												className="flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
												onClick={handleLogout}
											>
												<LuLogOut className="mr-3 h-4 w-4" />
												Logout
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<>
								<Link
									href="/signin"
									className="text-base font-medium text-gray-500 hover:text-gray-900"
								>
									Login
								</Link>
								<Link
									href="/signup"
									className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-600"
								>
									Register
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
						>
							<span className="sr-only">Open main menu</span>
							{isMenuOpen ? (
								<LuX className="block h-6 w-6" />
							) : (
								<LuMenu className="block h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile menu */}
				{isMenuOpen && (
					<div className="md:hidden">
						{/* Mobile Search */}
						<div className="px-2 pb-3 pt-2">
							<div className="relative">
								<input
									type="text"
									placeholder="Search for restaurants or dishes..."
									className="w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-red-500"
								/>
								<LuSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
							</div>
						</div>

						<div className="space-y-1 pb-3 pt-2">
							<Link
								href="/"
								className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							>
								Home
							</Link>
							<Link
								href="/restaurants"
								className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							>
								Restaurants
							</Link>
							<Link
								href="/offers"
								className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							>
								Offers
							</Link>
							<Link
								href="/contact"
								className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
							>
								Contact
							</Link>
						</div>
						<div className="border-t border-gray-200 pb-3 pt-4">
							{isLoggedIn ? (
								<div className="space-y-1">
									<Link
										href="/profile"
										className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
									>
										Profile
									</Link>
									<Link
										href="/settings"
										className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
									>
										Settings
									</Link>
									<button
										className="block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
										onClick={handleLogout}
									>
										Logout
									</button>
								</div>
							) : (
								<div className="space-y-1">
									<Link
										href="/login"
										className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
									>
										Login
									</Link>
									<Link
										href="/signup"
										className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
									>
										Register
									</Link>
								</div>
							)}
						</div>
					</div>
				)}
			</nav>
		</header>
	);
}
