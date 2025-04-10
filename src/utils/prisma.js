import { PrismaClient } from "@prisma/client";
export { PrismaClientValidationError } from "@prisma/client/runtime/library";

const prismaGlobal = globalThis;

export const prisma =
	prismaGlobal.prisma ??
	new PrismaClient({
		omit: {
			user: {
				hashedPassword: true,
			},
		},
	});

if (process.env.NODE_ENV !== "production") prismaGlobal.prisma = prisma;
