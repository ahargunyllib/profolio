import { env } from "@/env.mjs";
import * as jose from "jose";
import type { RoleKey } from "./enums";

interface TokenPayload {
	iss: string;
	exp: number;
	user_id: string;
	role: RoleKey;
}

export function decodeToken(token: string): TokenPayload {
	return jose.decodeJwt(token);
}

export async function encodeToken(payload: jose.JWTPayload) {
	const jwt = new jose.SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setExpirationTime(env.SESSION_EXPIRATION_TIME);

	const secret = new TextEncoder().encode(env.SESSION_SECRET);

	const token = await jwt.sign(secret);

	return token;
}
