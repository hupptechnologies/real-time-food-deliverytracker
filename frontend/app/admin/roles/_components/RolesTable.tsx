'use client';

import React from 'react';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ArrowUpDown, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Role } from '@/types/customer';
import { DataTable } from '@/components/DataTable';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { UpdateRoleSheet } from './UpdateRoleSheet';
import { DeleteRoleDialog } from './DeleteRoleDialog';

export default function RolesTable({ roles }: { roles: Role[] }) {
	const [rowAction, setRowAction] =
		React.useState<DataTableRowAction<Role> | null>(null);

	const columns = React.useMemo(() => getColumns({ setRowAction }), []);

	return (
		<div className="container mx-auto">
			<DataTable columns={columns} data={roles} disablePagination />
			<UpdateRoleSheet
				open={rowAction?.type === 'update'}
				onOpenChange={() => setRowAction(null)}
				role={rowAction?.row.original ?? null}
			/>
			<DeleteRoleDialog
				open={rowAction?.type === 'delete'}
				onOpenChange={() => setRowAction(null)}
				role={rowAction?.row.original ?? null}
				showTrigger={false}
			/>
		</div>
	);
}

interface DataTableRowAction<TData> {
	row: Row<TData>;
	type: 'update' | 'delete';
}
interface GetColumnsProps {
	setRowAction: React.Dispatch<
		React.SetStateAction<DataTableRowAction<Role> | null>
	>;
}

function getColumns({ setRowAction }: GetColumnsProps): ColumnDef<Role>[] {
	return [
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
			accessorFn: (row) => capitalizeFirstLetter(row.name),
			enableGlobalFilter: true,
		},
		{
			accessorKey: 'description',
			header: 'Description',
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
			enableGlobalFilter: false,
		},
		{
			id: 'actions',
			enableGlobalFilter: false,
			cell: ({ row }) => {
				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreVertical className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuItem
								onSelect={() => {
									setRowAction({ row, type: 'update' });
								}}
							>
								Edit
							</DropdownMenuItem>
							<DropdownMenuItem
								onSelect={() => {
									setRowAction({ row, type: 'delete' });
								}}
								className="text-red-600"
							>
								Delete
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				);
			},
		},
	];
}
