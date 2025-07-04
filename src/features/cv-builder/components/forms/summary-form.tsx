import { Button } from "@/shared/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import type { TCreateCVRequest } from "@/shared/repositories/cvs/dto";
import { useGenerateSummariesMutation } from "@/shared/repositories/cvs/query";
import { RefreshCwIcon, SparklesIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

export default function SummaryForm() {
	const form = useFormContext<TCreateCVRequest>();

	// const [isGeneratingSummaries, setIsGeneratingSummaries] = useState(false);
	const { mutate: generateSummaries, isPending: isGeneratingSummaries } =
		useGenerateSummariesMutation();
	const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

	const generateAISummary = async () => {
		setAiSuggestions([]);

		const req = form.getValues();

		generateSummaries(req, {
			onSuccess(res) {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				setAiSuggestions(res.data);
			},
		});
	};

	const useSuggestion = useCallback(
		(suggestion: string) => {
			form.setValue("data.summary", suggestion);
			setAiSuggestions([]);
		},
		[form],
	);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Summary</CardTitle>
				<div className="text-sm text-muted-foreground">
					Provide a brief summary of your professional background. This will
					help potential employers understand your qualifications.
				</div>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<FormField
						control={form.control}
						name="data.summary"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Textarea
										id="summary"
										placeholder="A brief summary of your professional background..."
										className="h-24 resize-none"
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Provide a concise summary of your skills, experience, and
									career goals. This section should highlight your key strengths
									and what you bring to potential employers.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Card>
						<CardHeader>
							<CardTitle className="flex flex-row items-center gap-2">
								<SparklesIcon />
								AI Summary Generator
							</CardTitle>
							<CardDescription>
								Let AI help you create a compelling professional summary based
								on your experience.
							</CardDescription>
							<CardAction>
								<Button
									onClick={generateAISummary}
									disabled={isGeneratingSummaries}
								>
									{isGeneratingSummaries ? (
										<RefreshCwIcon className="w-4 h-4 animate-spin" />
									) : (
										<SparklesIcon className="w-4 h-4" />
									)}
									{isGeneratingSummaries
										? "Generating..."
										: "Generate AI Summary"}
								</Button>
							</CardAction>
						</CardHeader>
						<CardContent>
							{aiSuggestions.length > 0 && (
								<div className="space-y-2">
									{aiSuggestions.map((suggestion, index) => (
										<div
											key={suggestion}
											className="p-4 border rounded-lg space-y-2"
										>
											<p className="text-sm">{suggestion}</p>
											<Button
												size="sm"
												variant="outline"
												onClick={() => useSuggestion(suggestion)}
											>
												Use This Summary
											</Button>
										</div>
									))}
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
}
