import { PrismaClient } from "@prisma/client";
export { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const prisma = new PrismaClient({
	omit: {
		user: {
			hashedPassword: true,
		},
	},
});
