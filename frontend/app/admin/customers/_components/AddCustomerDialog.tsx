'use client';

import { useCallback, useState } from 'react';
import { Loader2, Plus, UserRoundPlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { addCustomerSchema, addCustomerSchemaType } from '@/schema/customer';
import { AddCustomer } from '@/app/actions/admin/addCustomer';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';

export function AddCustomerDialog() {
	const roles = [
		{
			id: 1,
			name: 'admin',
			description: 'Super administrator with full access',
			createdAt: '2025-02-24T11:11:12.293Z',
			updatedAt: '2025-02-24T11:11:12.293Z',
		},
		{
			id: 2,
			name: 'user',
			description: 'Default user with basic platform access',
			createdAt: '2025-02-24T11:11:12.293Z',
			updatedAt: '2025-02-24T11:11:12.293Z',
		},
		{
			id: 3,
			name: 'restaurant',
			description: 'Restaurant/Vendor role',
			createdAt: '2025-02-24T11:11:12.293Z',
			updatedAt: '2025-02-24T11:11:12.293Z',
		},
		{
			id: 4,
			name: 'driver',
			description: 'Delivery driver role',
			createdAt: '2025-02-24T11:11:12.293Z',
			updatedAt: '2025-02-24T11:11:12.293Z',
		},
	];
	const [open, setOpen] = useState<boolean>(false);

	const form = useForm<addCustomerSchemaType>({
		resolver: zodResolver(addCustomerSchema),
		defaultValues: { role: 2 },
	});

	const { mutate, isPending } = useMutation({
		mutationFn: AddCustomer,
		onSuccess: () => {
			toast.success('Customer added', { id: 'add-customer' });
		},
		onError: (error) => {
			if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
				toast.success('Customer added', { id: 'add-customer' });
				return;
			}
			toast.error('Something went wrong!', { id: 'add-customer' });
		},
	});

	const onSubmit = useCallback(
		(values: addCustomerSchemaType) => {
			toast.loading('Adding customer....', { id: 'add-customer' });
			mutate({ ...values, role: Number(values.role) });
		},
		[mutate],
	);

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				form.reset();
				setOpen(open);
			}}
		>
			<DialogTrigger asChild>
				<Button className="bg-red-500 hover:bg-red-600">
					<Plus className="mr-2 h-4 w-4" />
					Add Customer
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="py-6">
					<DialogTitle asChild>
						<div className="flex flex-col items-center gap-2">
							<UserRoundPlus className={'stroke-primary'} />
							<p className="text-xl text-primary">Add customer</p>
						</div>
					</DialogTitle>
					<Separator />
				</DialogHeader>
				<div className="p-6">
					<Form {...form}>
						<form
							className="w-full space-y-8"
							onSubmit={form.handleSubmit(onSubmit)}
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-1">
											Name
											<p className="text-xs text-primary">(required)</p>
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-1">
											Email
											<p className="text-xs text-primary">(required)</p>
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="role"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-1">
											Role
										</FormLabel>
										<Select
											onValueChange={(value) => field.onChange(Number(value))}
											defaultValue="2"
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a role" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{roles.map((role) => (
													<SelectItem key={role.id} value={String(role.id)}>
														{capitalizeFirstLetter(role.name)}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								type="submit"
								className="w-full bg-red-500 hover:bg-red-600"
								disabled={isPending}
							>
								{isPending && <Loader2 className="animate-spin" />}
								{!isPending && 'Add customer'}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
