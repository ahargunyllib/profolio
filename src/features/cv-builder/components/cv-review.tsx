import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import { Progress } from "@/shared/components/ui/progress";
import { cn } from "@/shared/lib/utils";
import type { TCreateCVRequest } from "@/shared/repositories/cvs/dto";
import { useGenerateGradeMutation } from "@/shared/repositories/cvs/query";
import type { CV } from "@/shared/types";
import { ChartColumnIncreasingIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export default function CVGrade() {
	const form = useFormContext<TCreateCVRequest>();
	const [grade, setGrade] = useState<{
		atsScore: CV["atsScore"];
		suggestions: CV["suggestions"];
	} | null>(null);

	const { mutate: generateGrade, isPending: isGeneratingGrade } =
		useGenerateGradeMutation();

	const onGenerateGrade = () => {
		const req = form.getValues();
		generateGrade(req, {
			onSuccess(res) {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				form.setValue("atsScore", res.data.atsScore);
				form.setValue("suggestions", res.data.suggestions);

				setGrade({
					atsScore: res.data.atsScore,
					suggestions: res.data.suggestions,
				});
			},
		});
	};

	return (
		<section className="space-y-4">
			<Card>
				<CardHeader>
					<CardTitle> AI CV Grader</CardTitle>
					<CardDescription>
						This tool analyzes your CV and provides an ATS score along with
						suggestions for improvement. Click the button below to generate your
						CV grade.
					</CardDescription>
					<CardAction>
						<Button onClick={onGenerateGrade} disabled={isGeneratingGrade}>
							{isGeneratingGrade ? (
								<RefreshCwIcon className="w-4 h-4 animate-spin" />
							) : (
								<ChartColumnIncreasingIcon />
							)}
							{grade ? "Grading..." : "Generate CV Grade"}
						</Button>
					</CardAction>
				</CardHeader>
				<CardContent>
					{grade ? (
						<div className="space-y-4">
							<div className="flex flex-col gap-2 items-center justify-center">
								<h4 className="text-4xl font-semibold">{grade.atsScore}/100</h4>
								<Badge
									variant={
										grade.atsScore < 50
											? "destructive"
											: grade.atsScore < 80
												? "secondary"
												: "default"
									}
								>
									{grade.atsScore < 50
										? "Needs Improvement"
										: grade.atsScore < 80
											? "Good"
											: "Excellent"}
								</Badge>
							</div>
							<div className="space-y-4">
								{grade.suggestions.map((suggestion, index) => (
									<div key={suggestion.name} className="space-y-2">
										<div className="flex flex-row justify-between">
											<span className="font-semibold">{suggestion.name}</span>
											<span
												className={cn(
													"text-xs",
													suggestion.score < 50
														? "text-red-500"
														: "text-green-500",
												)}
											>
												{suggestion.score}%
											</span>
										</div>
										<Progress value={suggestion.score} className="h-2" />
										{suggestion.points && (
											<ul className="list-disc pl-5">
												{suggestion.points.map((point) => (
													<li
														key={point}
														className="text-sm text-muted-foreground"
													>
														{point}
													</li>
												))}
											</ul>
										)}
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="text-sm text-muted-foreground">
							Click the button above to generate your CV grade. This will
							analyze your CV and provide suggestions for improvement based on
							ATS optimization techniques.
						</div>
					)}
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="">ATS Optimization Tips</CardTitle>
					<CardDescription>
						Follow these tips to improve your CV's chances of passing through
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<div>
						<span className="font-semibold">Keywords</span>
						<p className="text-muted-foreground">
							Include relevant keywords from job descriptions
						</p>
					</div>
					<div>
						<span className="font-semibold">Formatting</span>
						<p className="text-muted-foreground">
							Use standard headings and bullet points
						</p>
					</div>
					<div>
						<span className="font-semibold">Quantify</span>
						<p className="text-muted-foreground">
							Include numbers and percentages in achievements
						</p>
					</div>
					<div>
						<span className="font-semibold">Length</span>
						<p className="text-muted-foreground">
							Keep it concise, ideally 1-2 pages
						</p>
					</div>
				</CardContent>
			</Card>
		</section>
	);
}
