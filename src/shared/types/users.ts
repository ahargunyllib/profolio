export type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: number;
	// password: string;
	profilePictureURL: string | null;
	phoneNumber: string | null;
	location: string | null;
	website: string | null;
	bio: string | null;
	currentJobTitle: string | null;
	currentCompany: string | null;
	createdAt: Date;
	updatedAt: Date;
};
