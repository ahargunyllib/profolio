import ListCVSection from "@/features/cv-management/sections/list-cv-section";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { FileTextIcon } from "lucide-react";
import type { ReactNode } from "react";

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
				<StatisticSection />
				<ListCVSection />
			</div>
		</section>
	);
}

function Header() {
	const user = {
		firstName: "John",
		lastName: "Doe",
		profilePictureURL: undefined,
	};

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
					<AvatarImage src={user.profilePictureURL} alt="Profile Picture" />
					<AvatarFallback>
						{user.firstName[0]}
						{user.lastName[0]}
					</AvatarFallback>
				</Avatar>
			</div>
		</header>
	);
}

function StatisticSection() {
	return (
		<div className="grid md:grid-cols-2 md:grid-rows-2 xl:grid-cols-4 xl:grid-rows-1 gap-y-4 gap-x-8">
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
			<StatisticCard
				title="Total CVs"
				value="3"
				icon={
					<div className="p-4 rounded-lg bg-blue-100">
						<FileTextIcon className="text-blue-600" />
					</div>
				}
			/>
		</div>
	);
}

function StatisticCard({
	title,
	value,
	icon,
}: { title: string; value: string; icon: ReactNode }) {
	return (
		<div className="bg-background border rounded-lg p-8 flex flex-row justify-between items-center">
			<div className="flex flex-col gap-2">
				<span className="text-muted-foreground text-xl font-semibold">
					{title}
				</span>
				<span className="font-extrabold text-3xl">{value}</span>
			</div>
			{icon}
		</div>
	);
}
