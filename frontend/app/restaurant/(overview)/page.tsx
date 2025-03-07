'use client';

import {
	ClipboardList,
	UtensilsCrossed,
	DollarSign,
	Star,
	ChevronUp,
	ChevronDown,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
		</div>
	);
}
