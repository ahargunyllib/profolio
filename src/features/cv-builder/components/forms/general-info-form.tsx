import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/shared/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import type { TCreateCVRequest } from "@/shared/repositories/cvs/dto";
import { useFormContext } from "react-hook-form";

export default function GeneralInfoForm() {
	const form = useFormContext<TCreateCVRequest>();
	return (
		<Card>
			<CardHeader>
				<CardTitle>General Info</CardTitle>
				<CardDescription>
					Tell us about yourself. This information will be used to create your
					CV.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<div className="space-y-4">
						<FormField
							control={form.control}
							name="jobName"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="jobName">
										Job Name
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											id="jobName"
											placeholder="Software Engineer"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="description">
										Description
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											id="description"
											placeholder="Brief description of your CV"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Description of the job or position you are applying for.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
}
