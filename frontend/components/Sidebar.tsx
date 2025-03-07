'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { NavItemWithChildren } from '@/types/layout';

export default function Sidebar({
	navigation,
	isMobileOpen,
	setMobileOpen,
}: {
	navigation: NavItemWithChildren[];
	isMobileOpen: boolean;
	setMobileOpen: (_open: boolean) => void;
}) {
	const pathname = usePathname();

	return (
		<>
			{/* Overlay for mobile */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 lg:hidden"
					onClick={() => setMobileOpen(false)}
				/>
			)}

			{/* Sidebar */}
			<div
				className={cn(
					'fixed inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out',
					isMobileOpen ? 'translate-x-0' : '-translate-x-full',
					'lg:translate-x-0',
				)}
			>
				<div className="flex h-full flex-col">
					{/* Sidebar header */}
					<div className="flex h-16 items-center border-b px-6">
						<Link href="/admin" className="flex items-center space-x-2">
							<ShoppingBag className="h-8 w-8 text-red-500" />
							<span className="text-xl font-bold">DeliveryGo</span>
						</Link>
					</div>

					{/* Navigation */}
					<ScrollArea className="flex-1">
						<nav className="px-2 py-4">
							{navigation.map((item) => {
								const Icon = item.icon;
								const isActive = pathname === item.href;
								// pathname.startsWith(`/admin/${item.href}/`);

								// If the item has children, render as accordion
								if (item.children?.length) {
									return (
										<Accordion
											key={item.name}
											type="single"
											collapsible
											className="w-full"
										>
											<AccordionItem value={item.name} className="border-none">
												<AccordionTrigger
													className={cn(
														'flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900',
														isActive && 'bg-muted text-primary',
													)}
												>
													<div className="flex items-center">
														<Icon className="mr-3 h-5 w-5 text-red-500" />
														{item.name}
													</div>
												</AccordionTrigger>
												<AccordionContent>
													<div className="space-y-1 pl-9">
														{item.children.map((child) => {
															const ChildIcon = child.icon;
															const isChildActive = pathname === child.href;

															return (
																<Link
																	key={child.name}
																	href={child.href}
																	className={cn(
																		'flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900',
																		isChildActive && 'bg-muted text-primary',
																	)}
																	onClick={() => setMobileOpen(false)}
																>
																	<ChildIcon className="mr-3 h-4 w-4 text-red-500" />
																	{child.name}
																</Link>
															);
														})}
													</div>
												</AccordionContent>
											</AccordionItem>
										</Accordion>
									);
								}

								// Regular nav item
								return (
									<Link
										key={item.name}
										href={item.href}
										className={cn(
											'flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900',
											isActive && 'bg-muted text-primary',
										)}
										onClick={() => setMobileOpen(false)}
									>
										<Icon className="mr-3 h-5 w-5 text-red-500" />
										{item.name}
									</Link>
								);
							})}
						</nav>
					</ScrollArea>
				</div>
			</div>
		</>
	);
}
