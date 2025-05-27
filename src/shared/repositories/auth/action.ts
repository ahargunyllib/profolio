"use server";

import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema/users";
import { compare, hash } from "bcrypt-ts";
import { eq } from "drizzle-orm";
import { encodeToken } from "../../lib/decode";
import type { ApiResponse } from "../../types";
import { destroySession } from "../session-manager/action";
import type { TLoginRequest, TLoginResponse, TRegisterRequest } from "./dto";

export async function login(
	payload: TLoginRequest,
): Promise<ApiResponse<TLoginResponse>> {
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, payload.email))
		.execute();
	if (!user) {
		return {
			success: false,
			error: "Unauthorized",
			message: "Invalid email or password",
		};
	}

	const isPasswordValid = await compare(payload.password, user.password);
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

	const access_token = await encodeToken(session);

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
	const [user] = await db
		.select()
		.from(usersTable)
		.where(eq(usersTable.email, payload.email))
		.execute();
	if (user) {
		return {
			success: false,
			error: "Email Conflict",
			message: "Email already used",
		};
	}

	payload.password = await hash(payload.password, 10);

	await db.insert(usersTable).values({
		email: payload.email,
		firstName: payload.firstName,
		lastName: payload.lastName,
		password: payload.password,
	});

	return {
		success: true,
		data: null,
		message: "Register successful",
	};
}
