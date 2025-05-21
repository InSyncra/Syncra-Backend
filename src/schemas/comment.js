import { z } from "zod";

export const CommentSchema = z.object({
	body: z
		.string({ message: "Text is required" })
		.min(1, { message: "Text must be at least 1 character" })
		.max(10000, { message: "Text exceeds 10000 characters" }),
});
