import { PrismaClient } from "../generated/prisma/client";
export { PrismaClientValidationError } from "@prisma/client/runtime/library";

export const prisma = new PrismaClient();
