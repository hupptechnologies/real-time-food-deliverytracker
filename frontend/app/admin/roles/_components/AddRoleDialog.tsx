'use client';

import { useCallback, useState } from 'react';
import { Loader2, Plus, ShieldPlus } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { roleSchema, roleSchemaType } from '@/schema/customer';
import { AddRole } from '@/app/actions/admin/addRole';

export function AddRoleDialog() {
	const [open, setOpen] = useState<boolean>(false);

	const form = useForm<roleSchemaType>({
		resolver: zodResolver(roleSchema),
		defaultValues: {},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: AddRole,
		onSuccess: () => {
			toast.success('Role added', { id: 'add-role' });
		},
		onError: (error) => {
			if (error instanceof Error && error.message.includes('NEXT_REDIRECT')) {
				toast.success('Role added', { id: 'add-role' });
				return;
			}
			toast.error('Something went wrong!', { id: 'add-role' });
		},
	});

	const onSubmit = useCallback(
		(values: roleSchemaType) => {
			toast.loading('Adding Role....', { id: 'add-role' });
			mutate(values);
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
					Add Role
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="py-6">
					<DialogTitle asChild>
						<div className="flex flex-col items-center gap-2">
							<ShieldPlus className={'stroke-primary'} />
							<p className="text-xl text-primary">Add Role</p>
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
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="flex items-center gap-1">
											Description
										</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
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
								{!isPending && 'Add Role'}
							</Button>
						</form>
					</Form>
				</div>
			</DialogContent>
		</Dialog>
	);
}
