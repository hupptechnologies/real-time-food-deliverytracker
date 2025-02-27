'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Customer, Role } from '@/types/customer';
import { DataTable } from '@/components/DataTable';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

export default function CustomersTable({
	customers,
}: {
	customers: Customer[];
}) {
	return (
		<div className="container mx-auto py-10">
			<DataTable
				columns={columns}
				data={customers}
				searchKey="name"
				filterOptions={{
					key: 'role',
					title: 'Role',
					options: [
						{ label: 'Admin', value: 'admin' },
						{ label: 'User', value: 'user' },
						{ label: 'Restaurant', value: 'restaurant' },
						{ label: 'Driver', value: 'driver' },
					],
				}}
			/>
		</div>
	);
}

const columns: ColumnDef<Customer>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: ({ column }) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
				>
					Name
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		id: 'role',
		accessorFn: (row) => capitalizeFirstLetter((row?.role as Role).name),
		header: 'Role',
		filterFn: (row, _columnId, filterValue) => {
			const role = capitalizeFirstLetter((row.original?.role as Role).name);
			return (
				filterValue === undefined || filterValue === '' || role === filterValue
			);
		},
	},
	{
		accessorKey: 'createdAt',
		header: 'Created',
		cell: ({ row }) => {
			const date = new Date(row.getValue('createdAt'));
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			});
		},
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			const user = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem
							onClick={() => navigator.clipboard.writeText(user.id.toString())}
						>
							Copy ID
						</DropdownMenuItem>
						<DropdownMenuItem>Edit</DropdownMenuItem>
						<DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
