import HeaderContainer from "@/features/cv-management/containers/header-container";
import StatisticContainer from "@/features/cv-management/containers/statistic-container";
import ListCVSection from "@/features/cv-management/sections/list-cv-section";
import { Suspense } from "react";

export default function Page() {
	return (
		<section className="min-h-dvh flex flex-col">
			<HeaderContainer />
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
