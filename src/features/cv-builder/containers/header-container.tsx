"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { useGetMySessionQuery } from "@/shared/repositories/auth/query";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeaderContainer() {
	const { data: res, isLoading } = useGetMySessionQuery();

	return (
		<header className="py-4 px-8 md:py-8 md:px-16 border-b flex flex-row items-center justify-between">
			<div className="flex flex-row items-center h-12 gap-4 text-muted-foreground">
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
				<Separator orientation="vertical" />
				<div className="flex flex-row gap-2 items-center">
					<Image
						src="/profolio-logo.png"
						alt="profolio"
						width={48}
						height={48}
					/>
					<span className="text-2xl font-semibold">Profolio CV Builder</span>
				</div>
			</div>
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
