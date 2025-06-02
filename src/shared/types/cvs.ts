import type { CVStatusKey } from "../lib/enums";
import type { User } from "./users";

export type CV = {
	id: string;
	userId: User["id"];
	user: User;
	jobName: string;
	description: string;
	atsScore: number;
	status: CVStatusKey;
	suggestions: {
		name: string;
		score: number;
		points: string[];
	}[];
	data: {
		firstName: string;
		lastName: string;
		email: string;
		phoneNumber?: string;
		location?: string;
		website?: string;
		linkedinProfile?: string;
		summary: string;

		jobExperiences: {
			jobTitle: string;
			company: string;
			location?: string;
			startDate: Date;
			endDate?: Date;
			description?: string;
			points: {
				point: string;
			}[];
		}[];

		educations: {
			institution: string;
			degree: string;
			fieldOfStudy?: string;
			location?: string;
			gpa?: number;
			startDate: Date;
			endDate?: Date;
		}[];

		skills?: {
			name: string;
		}[];
	};
	createdAt: string;
	updatedAt: string;
};
