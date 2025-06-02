"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { useGetMySessionQuery } from "@/shared/repositories/auth/query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function HeaderContainer() {
	const { data: res, isLoading } = useGetMySessionQuery();

	return (
		<header className="py-4 px-8 md:py-8 md:px-16 border-b flex flex-row items-center justify-between">
			<Button
				variant="ghost"
				className="flex flex-row gap-2 items-center"
				asChild
			>
				<Link href="/dashboard/home">
					<ArrowLeftIcon />
					<span className="text-base">Back to Dashboard</span>
				</Link>
			</Button>
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
		</header>
	);
}
