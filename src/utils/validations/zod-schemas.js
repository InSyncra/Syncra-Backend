import { z } from "zod";

// Every required parameter should provide a concise message
// So developers aren't left in the dark about what's missing.
// TODO: Add in min/max + any criteria to meet upon user signup
export const userSchema = z.object({
	firstName: z.string({ message: "First name is required" }).max(100, { message: "First Name over 100 characters" }),
	lastName: z.string({ message: "Last name is required" }).max(100, { message: "Last Name over 100 characters" }),
	nickname: z.string().max(100, { message: "Nickname over 100 characters" }).optional(),
	username: z.string({ message: "Username is required" }),
	email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
	password: z.string({ message: "Password is required" }),
	birthdate: z.string({ message: "Birthdate is required" }),
	profession: z.string().optional(),
	avatar: z.string().optional(),
	// While bio is optional, our database will allow up to 500 characters
	bio: z.string().max(500, { message: "Bio over 500 characters" }).optional(),
	githubUrl: z
		.string()
		.url({ message: "Invalid URL format" })
		.refine((value) => /^https:\/\/github\.com\/[a-zA-Z0-9](-?[a-zA-Z0-9])*$/.test(value), {
			message: "Invalid GitHub URL. Must be in the format https://github.com/<username>",
		})
		.optional(),

	// We also need to add this just in case the user either updates their profile or adds this information at signup/onboarding
	skillLevel: z.string().optional(),
});

export const userUpdateSchema = userSchema.omit({ password: true });

// Use credential to accept either username or password
export const userCredentialSchema = z.object({
	credential: z.string({ message: "Username or email is required" }),
	password: z.string({ message: "Password is required" }),
});

export const projectSchema = z.object({
	title: z
		.string({ message: "Title is required" })
		.min(5, { message: "Title must be at least 5 characters" })
		.max(100, { message: "Title exceeds 100 characters" }),
	description: z
		.string({ message: "Description is required" })
		.min(5, { message: "Description must be at least 5 characters" })
		.max(500, { message: "Description exceeds 500 characters" }),
	githubUrl: z.string().optional(),
	isPublic: z.boolean().optional().default(true),
	thumbnailUrl: z.string().optional(),
});
