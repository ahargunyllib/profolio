import StatisticContainer from "@/features/cv-management/containers/statistic-container";
import ListCVSection from "@/features/cv-management/sections/list-cv-section";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { getMySession } from "@/shared/repositories/auth/action";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
	return (
		<section className="min-h-dvh flex flex-col">
			<Header />
			<div className="bg-muted p-4 md:p-16 space-y-8 flex-1">
				<div className="space-y-2">
					<h1 className="font-bold text-5xl">My CVs</h1>
					<p className="text-muted-foreground text-lg">
						Manage and optimize your professional CVs for maximum ATS
						compatibility.
					</p>
				</div>
				<StatisticContainer />
				<Suspense>
					<ListCVSection />
				</Suspense>
			</div>
		</section>
	);
}

async function Header() {
	const session = await getMySession();

	if (!session.success) {
		notFound();
	}

	const user = session.data;

	return (
		<header className="py-4 px-8 md:py-8 md:px-16 border-b flex flex-row items-center justify-between">
			<div className="flex flex-row gap-2 items-center">
				<div className="bg-primary size-12 rounded-lg" />
				<span className="text-2xl font-semibold">Profolio</span>
			</div>
			<div className="flex flex-row gap-4 items-center">
				<span>
					Welcome back, <span className="font-semibold">{user.firstName}</span>
				</span>
				<Avatar>
					<AvatarImage
						src={user.profilePictureURL || undefined}
						alt="Profile Picture"
					/>
					<AvatarFallback>
						{user.firstName[0]}
						{user.lastName[0]}
					</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}
