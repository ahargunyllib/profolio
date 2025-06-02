"use client";

import CVEditorContainer from "@/features/cv-builder/containers/cv-editor-container";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
	return (
		<section className="min-h-dvh flex flex-col">
			<Header />
			<div className="bg-muted p-4 md:p-16 space-y-8 flex-1">
				<div className="space-y-2 text-center w-1/2 mx-auto">
					<h1 className="font-bold text-5xl">Design your resume</h1>
					<p className="text-muted-foreground text-lg">
						Follow the steps below to create your resume. Your progress will be
						saved automatically.
					</p>
				</div>
				<CVEditorContainer />
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
					<div className="bg-primary size-12 rounded-lg" />
					<span className="text-2xl font-semibold">Profolio CV Builder</span>
				</div>
			</div>
			<Avatar>
				<AvatarImage src={user.profilePictureURL} alt="Profile Picture" />
				<AvatarFallback>
					{user.firstName[0]}
					{user.lastName[0]}
				</AvatarFallback>
			</Avatar>
		</header>
	);
}
