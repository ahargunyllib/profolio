import z from "zod";

export const schema = z.object({
	jobName: z.string().min(1, "Job name is required"),
	description: z.string().min(1, "Description is required"),
	data: z.object({
		firstName: z.string().min(1, "First name is required"),
		lastName: z.string().min(1, "Last name is required"),
		email: z.string().email("Invalid email address"),
		phoneNumber: z.string().optional(),
		location: z.string().optional(),
		website: z.string().url("Invalid URL").optional(),
		linkedinProfile: z.string().url("Invalid URL").optional(),
		summary: z.string().min(1, "Summary is required"),

		jobExperiences: z.array(
			z.object({
				jobTitle: z.string().min(1, "Job title is required"),
				company: z.string().min(1, "Company name is required"),
				location: z.string().optional(),
				startDate: z.date(),
				endDate: z.date().optional(),
				description: z.string().optional(),
				points: z.array(
					z.object({
						point: z.string().min(1, "Point is required"),
					}),
				),
			}),
		),

		educations: z.array(
			z.object({
				institution: z.string().min(1, "Institution name is required"),
				degree: z.string().min(1, "Degree is required"),
				fieldOfStudy: z.string().min(1, "Field of study is required"),
				location: z.string().optional(),
				gpa: z.number().min(0).max(4).optional(),
				startDate: z.date(),
				endDate: z.date().optional(),
			}),
		),

		skills: z
			.array(
				z.object({
					name: z.string().min(1, "Skill name is required"),
				}),
			)
			.optional(),
	}),
});

export type CVData = z.infer<typeof schema>;
