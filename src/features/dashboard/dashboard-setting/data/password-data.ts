export interface PasswordData {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export const initialPasswordData: PasswordData = {
	currentPassword: "",
	newPassword: "",
	confirmPassword: "",
};
