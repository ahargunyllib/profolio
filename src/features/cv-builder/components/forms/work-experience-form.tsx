import { Button } from "@/shared/components/ui/button";
import { Calendar } from "@/shared/components/ui/calendar";
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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/lib/utils";
import type { TCreateCVRequest } from "@/shared/repositories/cvs/dto";
import { useGeneratePointsMutation } from "@/shared/repositories/cvs/query";
import {
	CalendarIcon,
	PlusIcon,
	RefreshCwIcon,
	SparklesIcon,
	Trash2Icon,
} from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";

export default function WorkExperienceForm() {
	const form = useFormContext<TCreateCVRequest>();
	const workExperienceArray = useFieldArray({
		control: form.control,
		name: "data.jobExperiences",
	});
	const { mutate: generatePoints, isPending: isGeneratingPoints } =
		useGeneratePointsMutation();

	const onGeneratePoints = async (index: number) => {
		const req = form.getValues();
		generatePoints(req.data.jobExperiences[index], {
			onSuccess(res) {
				if (!res.success) {
					toast.error(res.message);
					return;
				}

				form.setValue(`data.jobExperiences.${index}.points`, res.data);
			},
		});
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Work Experience</CardTitle>
				<CardDescription>
					Provide details about your work experience. This will help potential
					employers understand your professional background.
				</CardDescription>
				<CardAction>
					<Button
						variant="outline"
						onClick={() => {
							workExperienceArray.append({
								jobTitle: "",
								company: "",
								description: "",
								points: [],
								startDate: new Date(),
								endDate: undefined,
								location: "",
							});
						}}
					>
						<PlusIcon /> Add Experience
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{workExperienceArray.fields.length === 0 && (
						<p className="text-muted-foreground text-center text-xs">
							No work experience added yet. Click "Add Experience" to include
							your work history.
						</p>
					)}
					{workExperienceArray.fields.map((item, index) => (
						<div
							key={item.id}
							className="space-y-4 p-4 border rounded-md shadow-sm"
						>
							<div className="flex flex-row justify-between items-center">
								<Label className="text-lg font-semibold">
									Experience {index + 1}
								</Label>
								<Button
									size="icon"
									variant="destructive"
									onClick={() => workExperienceArray.remove(index)}
								>
									<Trash2Icon />
								</Button>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name={`data.jobExperiences.${index}.jobTitle`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Job Title
												<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input placeholder="Software Engineer" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`data.jobExperiences.${index}.company`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Company
												<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input placeholder="Amazon" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name={`data.jobExperiences.${index}.location`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Location</FormLabel>
										<FormControl>
											<Input placeholder="San Francisco, CA" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name={`data.jobExperiences.${index}.startDate`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Start Date
												<span className="text-red-500">*</span>
											</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"pl-3 text-left font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																Intl.DateTimeFormat("en-US", {
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}).format(new Date(field.value))
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) =>
															date > new Date() || date < new Date("1900-01-01")
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`data.jobExperiences.${index}.endDate`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>End Date</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant={"outline"}
															className={cn(
																"pl-3 text-left font-normal",
																!field.value && "text-muted-foreground",
															)}
														>
															{field.value ? (
																Intl.DateTimeFormat("en-US", {
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}).format(new Date(field.value))
															) : (
																<span>Pick a date</span>
															)}
															<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0" align="start">
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name={`data.jobExperiences.${index}.description`}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												placeholder="Brief description of your role"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name={`data.jobExperiences.${index}.points`}
								render={() => {
									return (
										<WorkExperiencePointsForm
											index={index}
											onGeneratePoints={onGeneratePoints}
											isGeneratingPoints={isGeneratingPoints}
											form={form}
										/>
									);
								}}
							/>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

function WorkExperiencePointsForm({
	index,
	onGeneratePoints,
	isGeneratingPoints,
	form,
}: {
	index: number;
	onGeneratePoints: (index: number) => void;
	isGeneratingPoints: boolean;
	form: ReturnType<typeof useFormContext<TCreateCVRequest>>;
}) {
	const pointsArray = useFieldArray({
		control: form.control,
		name: `data.jobExperiences.${index}.points`,
	});

	return (
		<FormItem>
			<div className="flex flex-row items-center justify-between">
				<FormLabel>Key Achievements (Bulleted Points)</FormLabel>
				<Button
					disabled={isGeneratingPoints}
					type="button"
					onClick={() => onGeneratePoints(index)}
				>
					{isGeneratingPoints ? (
						<RefreshCwIcon className="w-4 h-4 animate-spin" />
					) : (
						<SparklesIcon className="h-4 w-4" />
					)}
					{isGeneratingPoints ? "Generating..." : "Generate Points"}
				</Button>
			</div>

			{pointsArray.fields.map((point, pointIndex) => (
				<FormField
					key={point.id}
					control={form.control}
					name={`data.jobExperiences.${index}.points.${pointIndex}.point`}
					render={({ field }) => (
						<FormItem>
							<div className="flex flex-row gap-2">
								<FormControl>
									<Textarea
										placeholder="Key responsibility or achievement"
										{...field}
									/>
								</FormControl>
								<Button
									size="icon"
									variant="destructive"
									onClick={() => pointsArray.remove(pointIndex)}
								>
									<Trash2Icon />
								</Button>
							</div>

							<FormMessage />
						</FormItem>
					)}
				/>
			))}

			<Button
				className="w-min"
				variant="secondary"
				onClick={() => pointsArray.append({ point: "" })}
			>
				<PlusIcon />
				Add Point
			</Button>
		</FormItem>
	);
}
