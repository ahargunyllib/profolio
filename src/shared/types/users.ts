import type { RoleKey } from "../lib/enums";

export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: RoleKey;
	// password: string;
	profilePictureURL?: string;
	phoneNumber?: string;
	location?: string;
	website?: string;
	bio?: string;
	currentJobTitle?: string;
	currentCompany?: string;
	createdAt: string;
	updatedAt: string;
};
