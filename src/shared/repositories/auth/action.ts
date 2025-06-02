"use server";

import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema/users";
import { uploadFileToS3 } from "@/server/s3";
import { compare, hash } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { encodeToken } from "../../lib/decode";
import { tryCatch } from "../../lib/try-catch";
import type { ApiResponse, User } from "../../types";
import { destroySession, getSession } from "../session-manager/action";
import type {
	TLoginRequest,
	TLoginResponse,
	TRegisterRequest,
	TUpdatePasswordRequest,
	TUpdateProfilePictureRequest,
	TUpdateProfileRequest,
} from "./dto";

export async function login(
	payload: TLoginRequest,
): Promise<ApiResponse<TLoginResponse>> {
	const { data: users, error: errorSelect } = await tryCatch(
		db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, payload.email))
			.execute(),
	);
	if (errorSelect) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while accessing the database",
		};
	}

	const [user] = users;
	if (!user) {
		return {
			success: false,
			error: "Unauthorized",
			message: "Invalid email or password",
		};
	}

	const { data: isPasswordValid, error: errorCompare } = await tryCatch(
		compare(payload.password, user.password),
	);
	if (errorCompare) {
		return {
			success: false,
			error: "Comparison Error",
			message: "An error occurred while comparing passwords",
		};
	}

	if (!isPasswordValid) {
		return {
			success: false,
			error: "Unauthorized",
			message: "Invalid email or password",
		};
	}

	const session = {
		user_id: user.id,
		role: user.role,
	};

	const { data: access_token, error } = await tryCatch(encodeToken(session));
	if (error) {
		return {
			success: false,
			error: "Token Generation Error",
			message: "An error occurred while generating the access token",
		};
	}

	return {
		success: true,
		data: {
			access_token,
		},
		message: "Login successful",
	};
}

export async function logout() {
	await destroySession();
}

export async function register(
	payload: TRegisterRequest,
): Promise<ApiResponse<null>> {
	const { data: users, error: errorSelect } = await tryCatch(
		db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, payload.email))
			.execute(),
	);
	if (errorSelect) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while accessing the database",
		};
	}

	const [user] = users;
	if (user) {
		return {
			success: false,
			error: "Email Conflict",
			message: "Email already used",
		};
	}

	const { data: hashedPassword, error: errorHash } = await tryCatch(
		hash(payload.password, 10),
	);
	if (errorHash) {
		return {
			success: false,
			error: "Hashing Error",
			message: "An error occurred while hashing the password",
		};
	}

	payload.password = hashedPassword;

	const { error } = await tryCatch(
		db.insert(usersTable).values({
			email: payload.email,
			firstName: payload.firstName,
			lastName: payload.lastName,
			password: payload.password,
		}),
	);
	if (error) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while inserting the user",
		};
	}

	return {
		success: true,
		data: null,
		message: "Register successful",
	};
}

export async function getMySession(): Promise<ApiResponse<User>> {
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

	const { data: users, error: errorSelect } = await tryCatch(
		db.select().from(usersTable).where(eq(usersTable.id, session.userId)),
	);

	if (errorSelect) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while accessing the database",
		};
	}

	const [user] = users;

	if (!user) {
		return {
			success: false,
			error: "Not Found",
			message: "User not found",
		};
	}

	return {
		success: true,
		data: user,
		message: "Session retrieved successfully",
	};
}

export async function updatePassword(
	req: TUpdatePasswordRequest,
): Promise<ApiResponse<null>> {
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
			message: "You must be logged in to update your password",
		};
	}

	const { data: users, error: errorSelect } = await tryCatch(
		db.select().from(usersTable).where(eq(usersTable.id, session.userId)),
	);
	if (errorSelect) {
		return {
			success: false,
			error: "Database Error",
			message: "An error occurred while accessing the database",
		};
	}

	const [user] = users;
	if (!user) {
		return {
			success: false,
			error: "Not Found",
			message: "User not found",
		};
	}

	const { data: isCurrentPasswordValid, error: errorCompare } = await tryCatch(
		compare(req.currentPassword, user.password),
	);
	if (errorCompare) {
		return {
			success: false,
			error: "Comparison Error",
			message: "An error occurred while comparing passwords",
		};
	}

	if (!isCurrentPasswordValid) {
		return {
			success: false,
			error: "Unauthorized",
			message: "Invalid current password",
		};
	}

	const { data: hashedNewPassword, error: errorHash } = await tryCatch(
		hash(req.newPassword, 10),
	);
	if (errorHash) {
		return {
			success: false,
			error: "Hashing Error",
			message: "An error occurred while hashing the new password",
		};
	}

	await tryCatch(
		db
			.update(usersTable)
			.set({ password: hashedNewPassword })
			.where(eq(usersTable.id, session.userId)),
	);

	return {
		success: true,
		data: null,
		message: "Password updated successfully",
	};
}

export async function deleteMyAccount(): Promise<ApiResponse<null>> {
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
			message: "You must be logged in to delete your account",
		};
	}

	await tryCatch(
		db.delete(usersTable).where(eq(usersTable.id, session.userId)),
	);

	await destroySession();

	return {
		success: true,
		data: null,
		message: "Account deleted successfully",
	};
}

export async function updateMyProfile(
	req: TUpdateProfileRequest,
): Promise<ApiResponse<null>> {
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
			message: "You must be logged in to update your profile",
		};
	}

	await tryCatch(
		db
			.update(usersTable)
			.set({
				firstName: req.firstName,
				lastName: req.lastName,
				email: req.email,
				phoneNumber: req.phoneNumber,
				location: req.location,
				website: req.website,
				bio: req.bio,
				currentJobTitle: req.currentJobTitle,
				currentCompany: req.currentCompany,
			})
			.where(eq(usersTable.id, session.userId)),
	);

	return {
		success: true,
		data: null,
		message: "Profile updated successfully",
	};
}

export async function updateMyProfilePicture(
	req: TUpdateProfilePictureRequest,
): Promise<ApiResponse<null>> {
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
			message: "You must be logged in to update your profile picture",
		};
	}

	// Logic to handle file upload and update user profile picture
	// This is a placeholder as the actual implementation may vary
	// You would typically save the file to a storage service and update the user's profile with the new picture URL

	const { data: res, error: uploadError } = await tryCatch(
		uploadFileToS3(req.file),
	);
	if (uploadError) {
		return {
			success: false,
			error: "Upload Error",
			message: "An error occurred while uploading the profile picture",
		};
	}

	if (!res.success || !res.data) {
		return {
			success: false,
			error: res.error || "Unknown Error",
			message: res.message,
		};
	}

	const profilePictureURL = res.data.fileUrl;

	await tryCatch(
		db
			.update(usersTable)
			.set({ profilePictureURL })
			.where(eq(usersTable.id, session.userId)),
	);

	return {
		success: true,
		data: null,
		message: "Profile picture updated successfully",
	};
}
