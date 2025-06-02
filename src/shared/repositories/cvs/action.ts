"use server";

import { generateObjectFromAI, models } from "@/server/ai";
import z from "zod";
import { type CVData, schema } from "./dto";

export const generatePoints = async (
	req: CVData["data"]["jobExperiences"][number],
) => {
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

	const points = await generateObjectFromAI(
		models["gemini-2.0-flash"],
		prompt,
		schema.shape.data.shape.jobExperiences.element.shape.points,
	);

	return points;
};

export const generateSummaries = async (req: CVData) => {
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

	const summaries = await generateObjectFromAI(
		models["gemini-2.0-flash"],
		prompt,
		z.array(schema.shape.data.shape.summary),
	);

	return summaries;
};

export const generateGrade = async (req: CVData) => {
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

	const grade = await generateObjectFromAI(
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
	);

	return grade;
};
