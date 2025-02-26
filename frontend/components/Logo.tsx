import Link from 'next/link';
import React from 'react';
import { LuShoppingBag } from 'react-icons/lu';

export default function Logo() {
	return (
		<Link href="/" className="flex items-center space-x-2">
			<LuShoppingBag className="h-8 w-8 text-red-500" />
			<span className="text-xl font-bold text-gray-900">DeliveryGo</span>
		</Link>
	);
}
