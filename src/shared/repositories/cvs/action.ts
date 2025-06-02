"use server";

import { generateObjectFromAI, models } from "@/server/ai";
import { db } from "@/server/db";
import { cvsTable } from "@/server/db/schema/cv";
import { and, avg, count, eq, ilike, or, sql } from "drizzle-orm";
import z from "zod";
import { tryCatch } from "../../lib/try-catch";
import type { ApiResponse, CV } from "../../types";
import { getSession } from "../session-manager/action";
import {
	CreateCVSchema,
	type TCreateCVRequest,
	type TUpdateCVRequest,
} from "./dto";

export const generatePoints = async (
	req: TCreateCVRequest["data"]["jobExperiences"][number],
): Promise<ApiResponse<CV["data"]["jobExperiences"][number]["points"]>> => {
	const prompt = `
    Generate key achievements for the following job experience:
    Job Title: ${req.jobTitle}
    Company: ${req.company}
    Description: ${req.description || "N/A"}
    Start Date: ${req.startDate}
    End Date: ${req.endDate || "Present"}
    Location: ${req.location || "N/A"}

    Max 5 points, each point should be a concise achievement or responsibility related to the job experience.
    Each point should be a single sentence, starting with an action verb.
    Limit each point to 20 words.
    Language: English
  `;

	const { data: points, error } = await tryCatch(
		generateObjectFromAI(
			models["gemini-2.0-flash"],
			prompt,
			CreateCVSchema.shape.data.shape.jobExperiences.element.shape.points,
		),
	);
	if (error) {
		return {
			success: false,
			error: "AI Generation Error",
			message:
				"An error occurred while generating points for the job experience",
		};
	}

	return {
		success: true,
		message: "Points generated successfully",
		data: points,
	};
};

export const generateSummaries = async (
	req: TCreateCVRequest,
): Promise<ApiResponse<CV["data"]["summary"][]>> => {
	const prompt = `
    Generate multiple concise professional summaries for a CV based on the following information:
    First Name: ${req.data.firstName}
    Last Name: ${req.data.lastName}
    Email: ${req.data.email}
    Phone Number: ${req.data.phoneNumber || "N/A"}
    Location: ${req.data.location || "N/A"}
    Website: ${req.data.website || "N/A"}
    LinkedIn Profile: ${req.data.linkedinProfile || "N/A"}

    Job Experiences:
    ${req.data.jobExperiences
			.map(
				(job) => `
      - Job Title: ${job.jobTitle}
        Company: ${job.company}
        Description: ${job.description || "N/A"}
        Start Date: ${job.startDate}
        End Date: ${job.endDate || "Present"}
        Location: ${job.location || "N/A"}
      `,
			)
			.join("\n")}

    Educations:
    ${req.data.educations
			.map(
				(edu) => `
      - Institution: ${edu.institution}
        Degree: ${edu.degree}
        Field of Study: ${edu.fieldOfStudy || "N/A"}
        Location: ${edu.location || "N/A"}
        GPA: ${edu.gpa || "N/A"}
        Start Date: ${edu.startDate}
        End Date: ${edu.endDate || "Present"}
      `,
			)
			.join("\n")}

    Skills: ${req.data.skills?.map((skill) => skill.name).join(", ") || "N/A"}

    Generate multiple professional summaries that highlights the candidate's key skills, experiences, and achievements.
    The summaries should be tailored for a job application in the candidate's field.
    The summaries should be engaging, professional, and suitable for a CV.

    Summaries should be in English, concise, and highlight key skills and experiences.
  `;

	const { data: summaries, error } = await tryCatch(
		generateObjectFromAI(
			models["gemini-2.0-flash"],
			prompt,
			z.array(CreateCVSchema.shape.data.shape.summary),
		),
	);

	if (error) {
		return {
			success: false,
			error: "AI Generation Error",
			message: "An error occurred while generating summaries for the CV",
		};
	}

	if (!Array.isArray(summaries) || summaries.length === 0) {
		return {
			success: false,
			error: "Invalid Response",
			message: "The AI did not return valid summaries",
		};
	}

	return {
		success: true,
		message: "Summaries generated successfully",
		data: summaries,
	};
};

export const generateGrade = async (
	req: TCreateCVRequest,
): Promise<ApiResponse<Pick<CV, "atsScore" | "suggestions">>> => {
	const prompt = `
    Analyze the following CV data and provide a grade based on its completeness and relevance for job applications:

    First Name: ${req.data.firstName}
    Last Name: ${req.data.lastName}
    Email: ${req.data.email}
    Phone Number: ${req.data.phoneNumber || "N/A"}
    Location: ${req.data.location || "N/A"}
    Website: ${req.data.website || "N/A"}
    LinkedIn Profile: ${req.data.linkedinProfile || "N/A"}

    Job Experiences:
    ${req.data.jobExperiences
			.map(
				(job) => `
      - Job Title: ${job.jobTitle}
        Company: ${job.company}
        Description: ${job.description || "N/A"}
        Start Date: ${job.startDate}
        End Date: ${job.endDate || "Present"}
        Location: ${job.location || "N/A"}
      `,
			)
			.join("\n")}

    Educations:
    ${req.data.educations
			.map(
				(edu) => `
      - Institution: ${edu.institution}
        Degree: ${edu.degree}
        Field of Study: ${edu.fieldOfStudy || "N/A"}
        Location: ${edu.location || "N/A"}
        GPA: ${edu.gpa || "N/A"}
        Start Date: ${edu.startDate}
        End Date: ${edu.endDate || "Present"}
      `,
			)
			.join("\n")}

    Skills: ${req.data.skills?.map((skill) => skill.name).join(", ") || "N/A"}

    Summary: ${req.data.summary}

    Provide a score from 0 to 100 based on the following criteria:
    1. Completeness of the CV (e.g., presence of contact information, job experiences, education, skills).
    2. Relevance of the information provided for job applications in the candidate's field.
    3. Clarity and professionalism of the language used.
    4. Overall presentation and organization of the CV.
    Provide suggestions for improvement, including specific points that could enhance the CV.
    The output should include:
    - atsScore: A number between 0 and 100 representing the ATS score.
    - suggestions: An array of objects, each containing a score (0-100) and an array of points that suggest improvements.
    The suggestions should be actionable and specific to the CV data provided.
  `;

	const { data: grade, error } = await tryCatch(
		generateObjectFromAI(
			models["gemini-2.0-flash"],
			prompt,
			z.object({
				atsScore: z.number().min(0).max(100),
				suggestions: z.array(
					z.object({
						name: z.string(),
						score: z.number().min(0).max(100),
						points: z.array(z.string()),
					}),
				),
			}),
		),
	);

	if (error) {
		return {
			success: false,
			error: "AI Generation Error",
			message: "An error occurred while generating the CV grade",
		};
	}

	return {
		success: true,
		data: grade,
		message: "CV grade generated successfully",
	};
};

export const getMyCVs = async (query: {
	search: string | null;
	status: number | null;
}): Promise<ApiResponse<CV[]>> => {
	const { data: session, error: getSessionError } = await tryCatch(
		getSession(),
	);
	if (getSessionError) {
		return {
			success: false,
			error: "Session Error",
			message: "An error occurred while retrieving the session",
		};
	}

	if (!session || !session.isLoggedIn) {
		return {
			success: false,
			error: "Unauthorized",
			message: "You must be logged in to view your CVs",
		};
	}

	const { data: cvs, error: fetchError } = await tryCatch(
		db
			.select()
			.from(cvsTable)
			.where(
				and(
					eq(cvsTable.userId, session.userId),
					or(
						query.search
							? ilike(cvsTable.jobName, `%${query.search}%`)
							: undefined,
						query.status ? eq(cvsTable.status, query.status) : undefined,
					),
				),
			),
	);
	if (fetchError) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while fetching your CVs from the database",
		};
	}

	return {
		success: true,
		message: "CVs retrieved successfully",
		data: cvs as unknown as CV[],
	};
};

export const getMyCVById = async (id: CV["id"]): Promise<ApiResponse<CV>> => {
	const { data: session, error: getSessionError } = await tryCatch(
		getSession(),
	);
	if (getSessionError) {
		return {
			success: false,
			error: "Session Error",
			message: "An error occurred while retrieving the session",
		};
	}

	if (!session || !session.isLoggedIn) {
		return {
			success: false,
			error: "Unauthorized",
			message: "You must be logged in to view a CV",
		};
	}

	const { data: cvs, error: fetchError } = await tryCatch(
		db
			.select()
			.from(cvsTable)
			.where(and(eq(cvsTable.id, id), eq(cvsTable.userId, session.userId))),
	);
	if (fetchError) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while fetching the CV from the database",
		};
	}

	const [cv] = cvs;
	if (!cv) {
		return {
			success: false,
			error: "Not Found",
			message: "CV not found or you do not have permission to view it",
		};
	}

	return {
		success: true,
		message: "CV retrieved successfully",
		data: cv as unknown as CV,
	};
};

export const createCV = async (
	req: TCreateCVRequest,
): Promise<ApiResponse<null>> => {
	const { data: session, error: getSessionError } = await tryCatch(
		getSession(),
	);
	if (getSessionError) {
		return {
			success: false,
			error: "Session Error",
			message: "An error occurred while retrieving the session",
		};
	}

	if (!session || !session.isLoggedIn) {
		return {
			success: false,
			error: "Unauthorized",
			message: "You must be logged in to create a CV",
		};
	}
	const { error: insertError } = await tryCatch(
		db.insert(cvsTable).values({
			userId: session.userId,
			jobName: req.jobName,
			description: req.description,
			atsScore: req.atsScore,
			status: req.atsScore >= 80 ? 3 : 2,
			suggestions: req.suggestions,
			data: req.data,
		}),
	);
	if (insertError) {
		console.error(insertError);
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while inserting the CV into the database",
		};
	}

	return {
		success: true,
		message: "CV created successfully",
		data: null,
	};
};

export const updateCV = async (
	id: CV["id"],
	req: TUpdateCVRequest,
): Promise<ApiResponse<null>> => {
	const { data: session, error: getSessionError } = await tryCatch(
		getSession(),
	);
	if (getSessionError) {
		return {
			success: false,
			error: "Session Error",
			message: "An error occurred while retrieving the session",
		};
	}

	if (!session || !session.isLoggedIn) {
		return {
			success: false,
			error: "Unauthorized",
			message: "You must be logged in to update a CV",
		};
	}

	const { error: updateError } = await tryCatch(
		db
			.update(cvsTable)
			.set({
				jobName: req.jobName,
				description: req.description,
				atsScore: req.atsScore,
				status: req.atsScore >= 80 ? 3 : 2,
				suggestions: req.suggestions,
				data: req.data,
			})
			.where(eq(cvsTable.id, id))
			.execute(),
	);
	if (updateError) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while updating the CV in the database",
		};
	}

	return {
		success: true,
		message: "CV updated successfully",
		data: null,
	};
};

export const deleteCV = async (id: CV["id"]): Promise<ApiResponse<null>> => {
	const { data: session, error: getSessionError } = await tryCatch(
		getSession(),
	);
	if (getSessionError) {
		return {
			success: false,
			error: "Session Error",
			message: "An error occurred while retrieving the session",
		};
	}

	if (!session || !session.isLoggedIn) {
		return {
			success: false,
			error: "Unauthorized",
			message: "You must be logged in to delete a CV",
		};
	}

	const { error: deleteError } = await tryCatch(
		db.delete(cvsTable).where(eq(cvsTable.id, id)),
	);
	if (deleteError) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while deleting the CV from the database",
		};
	}

	return {
		success: true,
		message: "CV deleted successfully",
		data: null,
	};
};

export const getMyCVStatistic = async (): Promise<
	ApiResponse<{
		total: number;
		completed: number;
		inProgress: number;
		draft: number;
		avgATSScore: string | null;
	}>
> => {
	const { data: session, error: getSessionError } = await tryCatch(
		getSession(),
	);
	if (getSessionError) {
		return {
			success: false,
			error: "Session Error",
			message: "An error occurred while retrieving the session",
		};
	}

	if (!session || !session.isLoggedIn) {
		return {
			success: false,
			error: "Unauthorized",
			message: "You must be logged in to view your CV statistics",
		};
	}

	const { data: stats, error: fetchError } = await tryCatch(
		db
			.select({
				total: count().as("total"),
				completed:
					sql<number>`COUNT(*) FILTER (WHERE ${eq(cvsTable.status, 3)})`.as(
						"completed",
					),
				inProgress:
					sql<number>`COUNT(*) FILTER (WHERE ${eq(cvsTable.status, 2)})`.as(
						"inProgress",
					),
				draft:
					sql<number>`COUNT(*) FILTER (WHERE ${eq(cvsTable.status, 1)})`.as(
						"draft",
					),
				avgATSScore: avg(cvsTable.atsScore).as("avgATSScore"),
			})
			.from(cvsTable)
			.where(eq(cvsTable.userId, session.userId)),
	);
	if (fetchError) {
		return {
			success: false,
			error: "Database Error",
			message:
				"An error occurred while fetching your CV statistics from the database",
		};
	}

	return {
		success: true,
		message: "CV statistics retrieved successfully",
		data: stats[0],
	};
};
