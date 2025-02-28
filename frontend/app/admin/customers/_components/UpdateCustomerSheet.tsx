'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet';
import { Customer, Role } from '@/types/customer';
import { addCustomerSchema, addCustomerSchemaType } from '@/schema/customer';
import { Input } from '@/components/ui/input';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useMutation } from '@tanstack/react-query';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { UpdateCustomer } from '@/app/actions/admin/updateCustomer';

interface UpdateCustomerSheetProps
	extends React.ComponentPropsWithRef<typeof Sheet> {
	customer: Customer | null;
	roles: Role[];
}

export function UpdateCustomerSheet({
	customer,
	roles,
	...props
}: UpdateCustomerSheetProps) {
	const form = useForm<addCustomerSchemaType>({
		resolver: zodResolver(addCustomerSchema),
		defaultValues: {},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: UpdateCustomer,
		onSuccess: () => {
			toast.success('Customer details updated', { id: 'update-customer' });
			props.onOpenChange?.(false);
		},
		onError: (error) => {
			if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
				toast.success('Customer updated', { id: 'update-customer' });
				return;
			}
			toast.error('Something went wrong!', { id: 'update-customer' });
		},
	});

	const onSubmit = React.useCallback(
		(values: addCustomerSchemaType) => {
			toast.loading('Updating customer details...', { id: 'update-customer' });
			mutate({ id: Number(customer?.id), form: values });
		},
		[mutate, customer],
	);

	React.useEffect(() => {
		if (customer) {
			form.reset({
				name: customer.name || '',
				email: customer.email || '',
				role: (customer.role as Role)?.id || 2,
			});
		}
	}, [customer]);

	return (
		<Sheet {...props}>
			<SheetContent className="flex flex-col gap-6 sm:max-w-md">
				<SheetHeader className="text-left">
					<SheetTitle>Update customer</SheetTitle>
					<SheetDescription>
						Update the customer details and save the changes.
					</SheetDescription>
				</SheetHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
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
										defaultValue={String((customer?.role as Role)?.id)}
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
						<SheetFooter className="gap-2 pt-2 sm:space-x-0">
							<SheetClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</SheetClose>
							<Button
								disabled={isPending}
								className="bg-red-500 hover:bg-red-600"
							>
								{isPending && (
									<Loader
										className="mr-2 size-4 animate-spin"
										aria-hidden="true"
									/>
								)}
								Save
							</Button>
						</SheetFooter>
					</form>
				</Form>
			</SheetContent>
		</Sheet>
	);
}
