import EditCVContainer from "@/features/cv-builder/containers/edit-cv-container";
import HeaderContainer from "@/features/cv-builder/containers/header-container";

export default async function Page({
	params,
}: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	return (
		<section className="min-h-dvh flex flex-col">
			<HeaderContainer />
			<div className="bg-muted p-4 md:p-16 space-y-8 flex-1">
				<div className="space-y-2 text-center w-1/2 mx-auto">
					<h1 className="font-bold text-5xl">Design your resume</h1>
					<p className="text-muted-foreground text-lg">
						Follow the steps below to create your resume. Your progress will be
						saved automatically.
					</p>
				</div>
				<EditCVContainer id={id} />
			</div>
		</section>
	);
}
