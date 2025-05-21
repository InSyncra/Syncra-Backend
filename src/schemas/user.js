import { z } from "zod";

// Handles sign up and also is used when updating a user
export const UserSchema = z.object({
	firstName: z.string({ message: "First name is required" }).max(100, { message: "First Name over 100 characters" }),
	lastName: z.string({ message: "Last name is required" }).max(100, { message: "Last Name over 100 characters" }),
	nickname: z
		.string()
		.max(100, { message: "Nickname over 100 characters" })
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
	username: z.string({ message: "Username is required" }),
	email: z.string({ message: "Email is required" }).email({ message: "Invalid email address" }),
	birthdate: z.string({ message: "Birthdate is required" }),
	profession: z
		.string()
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
	avatar: z
		.string()
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
	// While bio is optional, our database will allow up to 500 characters
	bio: z
		.string()
		.max(500, { message: "Bio over 500 characters" })
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
	githubUrl: z
		.string()
		.transform((val) => (val === "" ? undefined : val))
		.optional()
		.refine((value) => value === undefined || /^https:\/\/github\.com\/[a-zA-Z0-9](-?[a-zA-Z0-9])*$/.test(value), {
			message: "Invalid GitHub URL. Must be in the format https://github.com/<username>",
		}),
	// We also need to add this just in case the user either updates their profile or adds this information at signup/onboarding
	skillLevel: z
		.string()
		.transform((val) => (val === "" ? undefined : val))
		.optional(),
});

// Take the password out of updating a user. Updating password handled separately
export const UpdateUserSchema = UserSchema.omit({ password: true });

export const LoginSchema = z.object({
	email: z.string({ message: "Email is required" }).email({ message: "Invalid email format" }),
	password: z.string({ message: "Password is required" }),
});
