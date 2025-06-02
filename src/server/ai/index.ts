import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { type LanguageModelV1, generateObject } from "ai";
import type { z } from "zod";

export const generateObjectFromAI = async <T>(
	model: LanguageModelV1,
	prompt: string,
	schema: z.Schema<T>,
): Promise<T> => {
	const res = await generateObject({
		schema,
		model,
		prompt,
	});

	return res.object as T;
};

export const models = {
	"gemini-2.0-flash": google("gemini-2.0-flash", {}),
	"gpt-4o": openai("gpt-4o"),
};
