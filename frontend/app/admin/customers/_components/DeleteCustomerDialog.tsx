'use client';

import * as React from 'react';
import { Loader, Trash } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';

import { useIsMobile } from '@/hooks/use-mobile';
import { Customer } from '@/types/customer';
import { useMutation } from '@tanstack/react-query';
import { DeleteCustomer } from '@/app/actions/admin/deleteCustomer';

interface DeleteCustomerDialogProps
	extends React.ComponentPropsWithoutRef<typeof Dialog> {
	customer: Customer | null;
	showTrigger?: boolean;
}

export function DeleteCustomerDialog({
	customer,
	showTrigger = true,
	...props
}: DeleteCustomerDialogProps) {
	const isMobile = useIsMobile();

	const { mutate, isPending } = useMutation({
		mutationFn: DeleteCustomer,
		onSuccess: () => {
			toast.success('Customer deleted!', { id: 'delete-customer' });
			props.onOpenChange?.(false);
		},
		onError: (error) => {
			if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
				toast.success('Customer deleted!', { id: 'delete-customer' });
				return;
			}
			toast.error('Something went wrong!', { id: 'delete-customer' });
		},
	});

	function handleCustomerDelete() {
		toast.loading('Deleting Customer....', { id: 'delete-customer' });
		mutate(Number(customer?.id));
	}

	if (isMobile) {
		return (
			<Drawer {...props}>
				{showTrigger ? (
					<DrawerTrigger asChild>
						<Button variant="outline" size="sm">
							<Trash className="mr-2 size-4" aria-hidden="true" />
							Delete Customer
						</Button>
					</DrawerTrigger>
				) : null}
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>Are you absolutely sure?</DrawerTitle>
						<DrawerDescription>
							This action cannot be undone. This will permanently delete{' '}
							<b className="font-bold text-black">{customer?.name}</b> from
							servers.
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter className="gap-2 sm:space-x-0">
						<DrawerClose asChild>
							<Button variant="outline">Cancel</Button>
						</DrawerClose>
						<Button
							aria-label="Delete selected customer"
							variant="destructive"
							onClick={handleCustomerDelete}
							disabled={isPending}
						>
							{isPending && (
								<Loader
									className="mr-2 size-4 animate-spin"
									aria-hidden="true"
								/>
							)}
							Delete
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog {...props}>
			{showTrigger ? (
				<DialogTrigger asChild>
					<Button variant="outline" size="sm">
						<Trash className="mr-2 size-4" aria-hidden="true" />
						Delete Customer
					</Button>
				</DialogTrigger>
			) : null}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete{' '}
						<b className="font-bold text-black">{customer?.name}</b> from
						servers.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter className="gap-2 sm:space-x-0">
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button
						aria-label="Delete selected customer"
						variant="destructive"
						onClick={handleCustomerDelete}
						disabled={isPending}
						className="bg-red-500 hover:bg-red-600"
					>
						{isPending && (
							<Loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
						)}
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
