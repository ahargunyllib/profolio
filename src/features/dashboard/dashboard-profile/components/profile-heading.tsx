"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import {
	type TUpdateProfilePictureRequest,
	UpdateProfilePictureSchema,
} from "@/shared/repositories/auth/dto";
import type { User } from "@/shared/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, RefreshCwIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { cn } from "../../../../shared/lib/utils";
import { useUpdateProfilePictureMutation } from "../../../../shared/repositories/auth/query";

type Props = {
	user: User;
};

export default function ProfileHeading({ user }: Props) {
	const form = useForm<TUpdateProfilePictureRequest>({
		resolver: zodResolver(UpdateProfilePictureSchema),
		defaultValues: {
			file: undefined,
		},
	});

	const inputRef = useRef<HTMLInputElement>(null);

	const [profilePictureURL, setProfilePictureURL] = useState(
		user.profilePictureURL || undefined,
	);

	const { mutate: uploadFile, isPending } = useUpdateProfilePictureMutation();

	const onSubmitHandler = form.handleSubmit((data) => {
		uploadFile(data, {
			onSuccess: (res) => {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				toast.success(res.message);
			},
		});
	});

	return (
		<div className="flex flex-col items-center gap-4">
			<div className="relative group w-32 h-32">
				<Avatar className="w-32 h-32 cursor-pointer" onClick={() => {}}>
					<AvatarImage
						src={profilePictureURL}
						alt="Profile"
						className="object-cover"
					/>
					<AvatarFallback>
						{user.firstName ? user.firstName[0] : "U"}
						{user.lastName ? user.lastName[0] : "N"}
					</AvatarFallback>
				</Avatar>
				<div
					className={cn(
						"absolute inset-0 bg-muted/0 group-hover:bg-muted/40 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer",
						isPending && "cursor-not-allowed bg-muted/40",
					)}
					onClick={() => {
						if (isPending) return;
						if (inputRef.current) {
							inputRef.current.click();
						}
					}}
					onKeyDown={() => {}}
					aria-label="Change profile picture"
				>
					{isPending ? (
						<RefreshCwIcon className="w-8 h-8 text-black animate-spin" />
					) : (
						<Camera className="w-8 h-8 text-black opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
					)}
				</div>
				<input
					type="file"
					accept="image/*"
					ref={inputRef}
					className="hidden"
					onChange={(e) => {
						if (
							e.target.files &&
							e.target.files.length > 0 &&
							inputRef.current
						) {
							const file = e.target.files[0];
							const url = URL.createObjectURL(file);
							setProfilePictureURL(url);
							form.setValue("file", file);

							onSubmitHandler();
						}
					}}
				/>
			</div>
			<div className="text-center">
				<span className="text-2xl font-bold">
					{user.firstName} {user.lastName}
				</span>
				<span className="text-blue-600 font-medium">
					{user.currentJobTitle}
				</span>
				<span className="text-gray-600">{user.currentCompany}</span>
			</div>
		</div>
	);
}
