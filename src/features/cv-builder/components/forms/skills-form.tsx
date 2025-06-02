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
	FormField,
	FormItem,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import type { CVData } from "@/shared/repositories/cvs/dto";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function SkillsForm() {
	const form = useFormContext<CVData>();
	const skillsArray = useFieldArray({
		control: form.control,
		name: "data.skills",
	});

	return (
		<Card>
			<CardHeader>
				<CardTitle>Skills</CardTitle>
				<CardDescription>
					List your skills to highlight your expertise. This will help potential
					employers understand your capabilities.
				</CardDescription>
				<CardAction>
					<Button
						variant="outline"
						onClick={() => {
							skillsArray.append({
								name: "",
							});
						}}
					>
						<PlusIcon /> Add Skill
					</Button>
				</CardAction>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{skillsArray.fields.length === 0 && (
						<p className="text-muted-foreground text-center text-xs">
							No skills added yet. Click "Add Skill" to include your skills.
						</p>
					)}
					{skillsArray.fields.map((skill, skillIndex) => (
						<FormField
							key={skill.id}
							control={form.control}
							name={`data.skills.${skillIndex}.name`}
							render={({ field }) => (
								<FormItem>
									<div className="flex flex-row gap-2">
										<FormControl>
											<Input
												id={`skills.${skillIndex}.name`}
												placeholder="Skill Name"
												{...field}
											/>
										</FormControl>
										<Button
											size="icon"
											variant="destructive"
											onClick={() => skillsArray.remove(skillIndex)}
										>
											<Trash2Icon />
										</Button>
									</div>

									<FormMessage />
								</FormItem>
							)}
						/>
					))}

					<Card>
						<CardHeader>
							<CardTitle className="text-base">Skill Categories</CardTitle>
							<CardDescription>
								Consider organizing your skills into categories for better ATS
								optimization:
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid md:grid-cols-2 gap-4 text-sm">
								<div>
									<h4 className="font-medium mb-2">Technical Skills:</h4>
									<p className="text-muted-foreground">
										Programming languages, frameworks, tools
									</p>
								</div>
								<div>
									<h4 className="font-medium mb-2">Soft Skills:</h4>
									<p className="text-muted-foreground">
										Communication, leadership, problem-solving
									</p>
								</div>
								<div>
									<h4 className="font-medium mb-2">Industry Skills:</h4>
									<p className="text-muted-foreground">
										Domain-specific knowledge and certifications
									</p>
								</div>
								<div>
									<h4 className="font-medium mb-2">Languages:</h4>
									<p className="text-muted-foreground">
										Spoken languages and proficiency levels
									</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</CardContent>
		</Card>
	);
}
