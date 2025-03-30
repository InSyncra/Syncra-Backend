import { ZodObject } from "zod";

/**
 * Parses the req.body against zod's safeParse() method
 *
 * If there is an error, it will next to the error handler,
 * Otherwise, it will just pass into route handler.
 *
 * @param {ZodObject} schema
 * @param {Request} req
 * @param {Function} next
 */
export function validateRequestBody(schema, req, next) {
	const { success, error } = schema.safeParse(req.body);

	if (!success) {
		const errors = [];

		error.errors.forEach((error) =>
			errors.push({
				[error.path[0]]: error.message,
			}),
		);

		const err = new Error("There were errors in the request provided");
		err.status = 400;
		err.title = "Validation Error";
		err.errors = errors;
		return next(err);
	}

	return;
}
