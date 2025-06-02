"use client";

import { Button } from "@/shared/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import {
	type TUpdatePasswordRequest,
	UpdatePasswordSchema,
} from "@/shared/repositories/auth/dto";
import { useUpdatePasswordMutation } from "@/shared/repositories/auth/query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Key } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ChangePasswordForm() {
	const [showCurrentPassword, setShowCurrentPassword] = useState(false);
	const [showNewPassword, setShowNewPassword] = useState(false);
	const { mutate: updatePassword, isPending } = useUpdatePasswordMutation();

	const form = useForm<TUpdatePasswordRequest>({
		resolver: zodResolver(UpdatePasswordSchema),
		defaultValues: {
			currentPassword: "",
			newPassword: "",
			confirmNewPassword: "",
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		updatePassword(data, {
			onSuccess: (res) => {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				toast.success(res.message);
				form.reset();
			},
		});
	});

	return (
		<div>
			<h3 className="text-lg font-medium text-gray-900 mb-4">
				Change Password
			</h3>
			<Form {...form}>
				<form onSubmit={onSubmitHandler} className="space-y-4 max-w-md">
					<FormField
						control={form.control}
						name="currentPassword"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel htmlFor="currentPassword">
										Current Password
									</FormLabel>
									<div className="relative mt-1">
										<FormControl>
											<Input
												id="currentPassword"
												type={showCurrentPassword ? "text" : "password"}
												{...field}
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowCurrentPassword((v) => !v)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										>
											{showCurrentPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="newPassword"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel htmlFor="newPassword">New Password</FormLabel>
									<div className="relative mt-1">
										<FormControl>
											<Input
												id="newPassword"
												type={showNewPassword ? "text" : "password"}
												{...field}
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowNewPassword((v) => !v)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										>
											{showNewPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="confirmNewPassword"
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel htmlFor="confirmNewPassword">
										Confirm New Password
									</FormLabel>
									<div className="relative mt-1">
										<FormControl>
											<Input
												id="confirmNewPassword"
												type={showNewPassword ? "text" : "password"}
												{...field}
											/>
										</FormControl>
										<button
											type="button"
											onClick={() => setShowNewPassword((v) => !v)}
											className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
										>
											{showNewPassword ? (
												<EyeOff className="w-4 h-4" />
											) : (
												<Eye className="w-4 h-4" />
											)}
										</button>
									</div>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<Button type="submit" disabled={isPending}>
						<Key />
						Update Password
					</Button>
				</form>
			</Form>
		</div>
	);
}
