import { z } from "zod";

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type TLoginRequest = z.infer<typeof LoginSchema>;

export type TLoginResponse = {
	access_token: string;
};

export const RegisterSchema = z.object({
	email: z.string().email(),
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	password: z.string().min(8),
});

export type TRegisterRequest = z.infer<typeof RegisterSchema>;

export const UpdatePasswordSchema = z
	.object({
		currentPassword: z.string().min(6),
		newPassword: z.string().min(6),
		confirmNewPassword: z.string().min(6),
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: "New password and confirmation do not match",
	});

export type TUpdatePasswordRequest = z.infer<typeof UpdatePasswordSchema>;

export const UpdateProfileSchema = z.object({
	firstName: z.string().min(1),
	lastName: z.string().min(1),
	email: z.string().email(),
	phoneNumber: z.string().optional(),
	location: z.string().optional(),
	website: z.string().url().optional(),
	bio: z.string().optional(),
	currentJobTitle: z.string().optional(),
	currentCompany: z.string().optional(),
});

export type TUpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;

export const UpdateProfilePictureSchema = z.object({
	file: z.instanceof(File).refine((file) => file.size <= 2 * 1024 * 1024, {
		message: "File size must be less than 2MB",
	}),
});

export type TUpdateProfilePictureRequest = z.infer<
	typeof UpdateProfilePictureSchema
>;
