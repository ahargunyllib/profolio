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
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import type { CVData } from "@/shared/repositories/cvs/dto";
import { useFormContext } from "react-hook-form";

export default function PersonalInfoForm() {
	const form = useFormContext<CVData>();

	return (
		<Card>
			<CardHeader>
				<CardTitle>Personal Info</CardTitle>
				<CardDescription>
					Provide your personal information. This will be included in your CV.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="data.firstName"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="firstName">
											First Name
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input id="firstName" placeholder="John" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="data.lastName"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="lastName">
											Last Name
											<span className="text-red-500">*</span>
										</FormLabel>
										<FormControl>
											<Input id="lastName" placeholder="Doe" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="data.email"
							render={({ field }) => (
								<FormItem>
									<FormLabel htmlFor="email">
										Email
										<span className="text-red-500">*</span>
									</FormLabel>
									<FormControl>
										<Input
											id="email"
											placeholder="johndoe@example.com"
											type="email"
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
								name="data.phoneNumber"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
										<FormControl>
											<Input
												id="phoneNumber"
												placeholder="+1234567890"
												type="tel"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="data.location"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="location">Location</FormLabel>
										<FormControl>
											<Input
												id="location"
												placeholder="City, Country"
												{...field}
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
								name="data.linkedinProfile"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="linkedinProfile">
											Linkedin Profile
										</FormLabel>
										<FormControl>
											<Input
												id="linkedinProfile"
												type="url"
												placeholder="linkedin.com/in/username"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="data.website"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="website">Website</FormLabel>
										<FormControl>
											<Input
												id="website"
												type="url"
												placeholder="yourwebsite.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</Form>
			</CardContent>
		</Card>
	);
}
