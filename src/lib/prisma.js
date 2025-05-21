import { PrismaClient } from "../generated/prisma/client.js";
export { PrismaClientValidationError } from "@prisma/client/runtime/library.js";

export const prisma = new PrismaClient({
	omit: {
		user: {
			hashedPassword: true,
		},
	},
});
