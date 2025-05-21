import { ZodObject } from "zod";
import { prisma } from "../lib/prisma.js";
import { sendErrorResponse } from "../utils/responses.js";

const resourceMap = {
	project: "Project",
	user: "User",
	comment: "Comment",
	subscription: "Subscription",
};

// /**
//  * Parses the req.body against zod's safeParse() method
//  * DEPRECATED: use validate(schemaName)
//  * If there is an error, it will next to the error handler,
//  * Otherwise, it will just pass into route handler.
//  *
//  * @param {ZodObject} schema
//  * @param {Request} req
//  * @param {Function} next
//  */
// export function validateRequestBody(schema, req, next) {
// 	const { success, error } = schema.safeParse(req.body);

// 	if (!success) {
// 		const errors = [];

// 		error.errors.forEach((error) =>
// 			errors.push({
// 				[error.path[0]]: error.message,
// 			}),
// 		);

// 		const err = new Error("There were errors in the request provided");
// 		err.status = 400;
// 		err.title = "Validation Error";
// 		err.errors = errors;
// 		return next(err);
// 	}

// 	return;
// }

/**
 * Express middleware to validate the request body using a Zod schema.
 * @param {ZodObject<any>} schema - Zod schema to validate the request body against.
 * @returns {import("express").RequestHandler} Express middleware function. (Passes to next step in request)
 */
export const validate = (schema) => (req, _res, next) => {
	if (!schema || typeof schema.safeParse !== "function") {
		throw new Error("Validation error: Valid Zod Schema not provided.");
	}

	const { success, error } = schema.safeParse(req.body);

	if (!success) {
		const errorList = [];
		error.errors.forEach((err) => errorList.push({ [err.path[0]]: err.message }));

		const err = new Error("Error validating the request");
		err.status = 400;
		err.title = "Validation Error";
		err.errors = errorList;
		return next(err);
	}

	return next();
};

export const checkResourceExists = (modelName) => async (req, res, next) => {
	const resourceId = req.params.id;

	try {
		const resource = await prisma[modelName].findUnique({
			where: { id: resourceId },
			select: { id: true },
		});

		if (!resource) {
			return sendErrorResponse(res, { error: `${resourceMap[modelName]} does not exist`, status: 404 });
		}

		next();
	} catch (error) {
		return next(error);
	}
};

export const checkResourceOwnership = (modelName) => async (req, res, next) => {
	const resourceId = req.params.id;
	const userId = req.user?.id;

	try {
		const resource = await prisma[modelName].findUnique({
			where: { id: resourceId },
			select: { userId: true },
		});

		if (resource.userId !== userId) {
			return sendErrorResponse(res, { error: "Forbidden", status: 403 });
		}

		next();
	} catch (error) {
		return next(error);
	}
};
