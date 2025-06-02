"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { useGetMySessionQuery } from "@/shared/repositories/auth/query";

export default function HeaderContainer() {
	const { data: res, isLoading } = useGetMySessionQuery();

	return (
		<header className="py-4 px-8 md:py-8 md:px-16 border-b flex flex-row items-center justify-between">
			<div className="flex flex-row gap-2 items-center">
				<div className="bg-primary size-12 rounded-lg" />
				<span className="text-2xl font-semibold">Profolio</span>
			</div>
			<div className="flex flex-row gap-4 items-center">
				<span>
					Welcome back,{" "}
					<span className="font-semibold">
						{!isLoading && res?.success && res.data.firstName}
					</span>
				</span>
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
			</div>
		</header>
	);
}
