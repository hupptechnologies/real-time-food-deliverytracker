import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function CustomerStats({ stats }: { stats: any[] }) {
	return (
		<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
			{stats.map((stat) => {
				const Icon = stat.icon;
				return (
					<Card key={stat.name}>
						<CardContent className="p-6">
							<div className="flex items-center">
								<div className="flex-shrink-0 rounded-md bg-gray-100 p-2">
									<Icon className="h-6 w-6 text-gray-600" />
								</div>
								<div className="ml-5 w-0 flex-1">
									<p className="truncate text-sm font-medium text-gray-500">
										{stat.name}
									</p>
									<div className="flex items-baseline">
										<p className="text-2xl font-semibold text-gray-900">
											{stat.value}
										</p>
										<p
											className={`ml-2 flex items-baseline text-sm font-semibold ${
												stat.changeType === 'positive'
													? 'text-green-600'
													: 'text-red-600'
											}`}
										>
											{stat.change}
											{stat.changeType === 'positive' ? (
												<ChevronUp className="ml-0.5 h-4 w-4" />
											) : (
												<ChevronDown className="ml-0.5 h-4 w-4" />
											)}
										</p>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				);
			})}
		</div>
	);
}
