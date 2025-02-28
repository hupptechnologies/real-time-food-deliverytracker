'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import * as React from 'react';
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
import { Role } from '@/types/customer';
import { roleSchema, roleSchemaType } from '@/schema/customer';
import { Input } from '@/components/ui/input';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { useMutation } from '@tanstack/react-query';
import { UpdateRole } from '@/app/actions/admin/updateRole';

interface UpdateRoleSheetProps
	extends React.ComponentPropsWithRef<typeof Sheet> {
	role: Role | null;
}

export function UpdateRoleSheet({ role, ...props }: UpdateRoleSheetProps) {
	const form = useForm<roleSchemaType>({
		resolver: zodResolver(roleSchema),
		defaultValues: {},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: UpdateRole,
		onSuccess: () => {
			toast.success('Role updated', { id: 'update-role' });
			props.onOpenChange?.(false);
		},
		onError: (error) => {
			if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
				toast.success('Role updated', { id: 'update-role' });
				return;
			}
			toast.error('Something went wrong!', { id: 'update-role' });
		},
	});

	const onSubmit = React.useCallback(
		(values: roleSchemaType) => {
			toast.loading('Updating Role....', { id: 'update-role' });
			mutate({ id: Number(role?.id), form: values });
		},
		[mutate, role],
	);

	React.useEffect(() => {
		if (role) {
			form.reset({
				name: capitalizeFirstLetter(role.name),
				description: role.description || '',
			});
		}
	}, [role]);

	return (
		<Sheet {...props}>
			<SheetContent className="flex flex-col gap-6 sm:max-w-md">
				<SheetHeader className="text-left">
					<SheetTitle>Update role</SheetTitle>
					<SheetDescription>
						Update the role details and save the changes
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
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												placeholder="User"
												className="resize-none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								);
							}}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Input
											placeholder="Description"
											className="resize-none"
											{...field}
										/>
									</FormControl>
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
