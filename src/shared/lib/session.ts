import { env } from "@/env.mjs";
import type { SessionOptions } from "iron-session";
import type { RoleKey } from "./enums";

// 8 hours in milliseconds
const MAX_AGE = 8 * 60 * 60 * 1000;

export type SessionData =
	| {
			isLoggedIn: false;
	  }
	| {
			isLoggedIn: true;
			userId: string;
			role: RoleKey;
			token: string;
	  };

export const defaultSession: SessionData = {
	isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
	password: env.IRON_SESSION_PASSWORD,
	cookieName: "session-cookie",
	cookieOptions: {
		//  allow 1 minute buffer
		maxAge: MAX_AGE - 60 * 1000,
		secure: true,
	},
};
