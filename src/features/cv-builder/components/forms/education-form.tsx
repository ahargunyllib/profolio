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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/utils";
import type { TCreateCVRequest } from "@/shared/repositories/cvs/dto";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function EducationForm() {
	const form = useFormContext<TCreateCVRequest>();
	const educationsArray = useFieldArray({
		control: form.control,
		name: "data.educations",
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Education</CardTitle>
				<CardDescription>
					Provide details about your educational background. This will help
					potential employers understand your qualifications.
				</CardDescription>
				<CardAction>
					<Button
						variant="outline"
						onClick={() => {
							educationsArray.append({
								institution: "",
								degree: "",
								fieldOfStudy: "",
								startDate: new Date(),
								endDate: undefined,
								gpa: 0,
								location: "",
							});
						}}
					>
						<PlusIcon /> Add Education
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{educationsArray.fields.length === 0 && (
						<p className="text-muted-foreground text-center text-xs">
							No education added yet. Click "Add Education" to include your
							educational background.
						</p>
					)}
					{educationsArray.fields.map((item, index) => (
						<div key={item.id} className="space-y-2">
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name={`data.educations.${index}.institution`}
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor={`institution-${index}`}>
												Institution
												<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input
													id={`institution-${index}`}
													placeholder="University Name"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`data.educations.${index}.degree`}
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor={`degree-${index}`}>
												Degree<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input
													id={`degree-${index}`}
													placeholder="Bachelor's, Master's, etc."
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name={`data.educations.${index}.location`}
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor={`location-${index}`}>
											Location
										</FormLabel>
										<FormControl>
											<Input
												id={`location-${index}`}
												placeholder="City, Country"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name={`data.educations.${index}.fieldOfStudy`}
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor={`fieldOfStudy-${index}`}>
												Field of Study
												<span className="text-red-500">*</span>
											</FormLabel>
											<FormControl>
												<Input
													id={`fieldOfStudy-${index}`}
													placeholder="Computer Science, Business, etc."
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name={`data.educations.${index}.gpa`}
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor={`gpa-${index}`}>GPA</FormLabel>
											<FormControl>
												<Input
													id={`gpa-${index}`}
													placeholder="3.5"
													inputMode="decimal"
													{...field}
													onChange={(e) => {
														const value = Number.parseFloat(e.target.value);

														if (
															!Number.isNaN(value) &&
															value >= 0 &&
															value <= 4
														) {
															field.onChange(value);
														} else {
															field.onChange("");
														}
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name={`data.educations.${index}.startDate`}
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor={`startDate-${index}`}>
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
														onSelect={(e) => {
															if (!e) {
																field.onChange(new Date());
															}

															field.onChange(e);
														}}
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
									name={`data.educations.${index}.endDate`}
									render={({ field }) => (
										<FormItem>
											<FormLabel htmlFor={`endDate-${index}`}>
												End Date
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
														initialFocus
													/>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
