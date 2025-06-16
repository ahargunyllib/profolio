import { RollingNumber } from "@/shared/components/rolling-number";

export default function Page() {
	return (
		<section className="min-h-dvh bg-muted p-4 md:p-16 space-y-8 flex-1">
			<div className="flex items-center flex-col gap-4 text-center w-1/2 mx-auto pt-40">
				<h1 className="font-bold text-5xl">CV Examples & Inspiration</h1>
				<p className="text-muted-foreground text-lg">
					Get inspired by real CVs created with Profolio. All examples are
					ATS-optimized and have helped professionals land their dream jobs.
				</p>

				<div className="flex flex-row gap-8 items-center">
					<div className="space-y-2">
						<RollingNumber value={10000} suffix="+" className="text-primary" />
						<span className="text-muted-foreground font-semibold">
							CVs created
						</span>
					</div>
					<div className="space-y-2">
						<RollingNumber value={94} suffix="%" className="text-green-600" />
						<span className="text-muted-foreground font-semibold">
							Avg ATS Score
						</span>
					</div>
					<div className="space-y-2">
						<RollingNumber value={85} suffix="%" className="text-primary" />
						<span className="text-muted-foreground font-semibold">
							Interview Rate
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
