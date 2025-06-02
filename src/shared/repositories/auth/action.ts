"use server";

import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema/users";
import { compare, hash } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { encodeToken } from "../../lib/decode";
import { tryCatch } from "../../lib/try-catch";
import type { ApiResponse } from "../../types";
import { destroySession } from "../session-manager/action";
import type { TLoginRequest, TLoginResponse, TRegisterRequest } from "./dto";

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
