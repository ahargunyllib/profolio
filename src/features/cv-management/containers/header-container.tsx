"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
	useGetMySessionQuery,
	useLogoutMutation,
} from "@/shared/repositories/auth/query";
import { LogOutIcon, SettingsIcon, User2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderContainer() {
	const { data: res, isLoading } = useGetMySessionQuery();
	const { mutate: logout, isPending } = useLogoutMutation();

	return (
		<header className="py-4 px-8 md:py-8 md:px-16 border-b flex flex-row items-center justify-between">
			<div className="flex flex-row gap-2 items-center">
				<Image src="/profolio-logo.png" alt="profolio" width={48} height={48} />
				<span className="text-2xl font-semibold">Profolio</span>
			</div>
			<div className="flex flex-row gap-4 items-center">
				<span>
					Welcome back,{" "}
					<span className="font-semibold">
						{!isLoading && res?.success && res.data.firstName}
					</span>
				</span>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage
								src={
									(!isLoading && res?.success && res.data.profilePictureURL) ||
									undefined
								}
								alt="Profile Picture"
							/>
							<AvatarFallback>
								{!isLoading && res?.success && res.data.firstName[0]}
								{!isLoading && res?.success && res.data.lastName[0]}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem asChild>
							<Link href="/dashboard/profile">
								<User2Icon />
								Profile
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem asChild>
							<Link href="/dashboard/settings">
								<SettingsIcon />
								Setting
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={() => logout()}
							disabled={isPending}
						>
							<LogOutIcon />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
