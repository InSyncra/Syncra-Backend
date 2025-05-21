import { z } from "zod";

// Handles creation and update
export const ProjectSchema = z.object({
	title: z
		.string({ message: "Title is required" })
		.min(5, { message: "Title must be at least 5 characters" })
		.max(100, { message: "Title exceeds 100 characters" }),
	description: z
		.string({ message: "Description is required" })
		.min(5, { message: "Description must be at least 5 characters" })
		.max(500, { message: "Description exceeds 500 characters" }),
	githubUrl: z
		.string()
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
	isPublic: z
		.boolean()
		.transform((val) => (val === "" ? undefined : val))
		.optional()
		.default(true),
	thumbnailUrl: z
		.string()
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
});
