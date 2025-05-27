import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		DATABASE_URL: z.string().url(),
		IRON_SESSION_SECRET: z.string().min(32),
		SESSION_SECRET: z.string().min(1),
		SESSION_EXPIRATION_TIME: z.string().min(1).default("1d"),

		OPEN_AI_API_KEY: z.string().min(1),
		GEMINI_API_KEY: z.string().min(1),

		AWS_S3_ACCESS_KEY: z.string().min(1),
		AWS_S3_SECRET_ACCESS_KEY: z.string().min(1),
		AWS_S3_URL: z.string().min(1),
		AWS_S3_BUCKET_NAME: z.string().min(1),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		NEXT_PUBLIC_APP_URL: z.string().min(1),
	},
	/*
	 * Due to how Next.js bundles environment variables on Edge and Client,
	 * we need to manually destructure them to make sure all are included in bundle.
	 *
	 * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		IRON_SESSION_SECRET: process.env.IRON_SESSION_SECRET,
		SESSION_SECRET: process.env.SESSION_SECRET,
		SESSION_EXPIRATION_TIME: process.env.SESSION_EXPIRATION_TIME,

		OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
		GEMINI_API_KEY: process.env.GEMINI_API_KEY,

		AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
		AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY,
		AWS_S3_URL: process.env.AWS_S3_URL,
		AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,

		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
	},
});
