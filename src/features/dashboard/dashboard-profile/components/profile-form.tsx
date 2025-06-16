"use client";

import { Button } from "@/shared/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import {
	type TUpdateProfileRequest,
	UpdateProfileSchema,
} from "@/shared/repositories/auth/dto";
import { useUpdateMyProfileMutation } from "@/shared/repositories/auth/query";
import type { User } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveIcon, XIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
	onCancel: () => void;
	user: User;
};

export default function ProfileForm({ onCancel, user }: Props) {
	const { mutate: updateMyProfile, isPending } = useUpdateMyProfileMutation();
	const form = useForm<TUpdateProfileRequest>({
		resolver: zodResolver(UpdateProfileSchema),
		defaultValues: {
			firstName: user.firstName || "",
			lastName: user.lastName || "",
			email: user.email || "",
			phoneNumber: user.phoneNumber || "",
			location: user.location || "",
			website: user.website || "",
			currentJobTitle: user.currentJobTitle || "",
			currentCompany: user.currentCompany || "",
			bio: user.bio || "",
		},
	});

	const onSubmitHandler = form.handleSubmit((data) => {
		updateMyProfile(data, {
			onSuccess: (res) => {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				toast.success(res.message);

				onCancel();
			},
		});
	});

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmitHandler}
				className="space-y-6 border rounded-lg p-6"
			>
				<div className="flex justify-between items-center">
					<h3 className="text-lg font-semibold">Edit Personal Information</h3>
					<div className="flex space-x-2">
						<Button
							type="submit"
							className="px-4 py-2 rounded text-sm flex items-center"
						>
							<SaveIcon />
							Save
						</Button>
						<Button
							onClick={onCancel}
							variant="outline"
							className="px-4 py-2 rounded text-sm flex items-center"
						>
							<XIcon />
							Cancel
						</Button>
					</div>
				</div>

				<div className="grid md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="firstName"
						render={({ field }) => {
							return (
								<FormItem>
									<Label htmlFor="firstName">First Name</Label>
									<FormControl>
										<Input id="firstName" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="lastName"
						render={({ field }) => {
							return (
								<FormItem>
									<Label htmlFor="lastName">Last Name</Label>
									<FormControl>
										<Input id="lastName" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>

				<FormField
					control={form.control}
					name="email"
					render={({ field }) => {
						return (
							<FormItem>
								<Label htmlFor="email">Email</Label>
								<FormControl>
									<Input id="email" type="email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<div className="grid md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="phoneNumber"
						render={({ field }) => {
							return (
								<FormItem>
									<Label htmlFor="phoneNumber">Phone Number</Label>
									<FormControl>
										<Input id="phoneNumber" type="tel" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => {
							return (
								<FormItem>
									<Label htmlFor="location">Location</Label>
									<FormControl>
										<Input id="location" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>

				<FormField
					control={form.control}
					name="website"
					render={({ field }) => {
						return (
							<FormItem>
								<Label htmlFor="website">Website</Label>
								<FormControl>
									<Input id="website" type="url" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<div className="grid md:grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="currentJobTitle"
						render={({ field }) => {
							return (
								<FormItem>
									<Label htmlFor="currentJobTitle">Current Job Title</Label>
									<FormControl>
										<Input id="currentJobTitle" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						control={form.control}
						name="currentCompany"
						render={({ field }) => {
							return (
								<FormItem>
									<Label htmlFor="currentCompany">Current Company</Label>
									<FormControl>
										<Input id="currentCompany" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>

				<FormField
					control={form.control}
					name="bio"
					render={({ field }) => {
						return (
							<FormItem>
								<Label htmlFor="bio">Bio</Label>
								<FormControl>
									<Textarea id="bio" rows={3} {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
			</form>
		</Form>
	);
}
