import config from "../config/index.js";
import { PrismaClientValidationError } from "../lib/prisma.js";
import logger from "../utils/logger.js";

export const resourceNotFoundError = (_req, _res, next) => {
	const error = new Error("Requested resource not found");
	error.status = 404;
	error.title = "404 Not Found";
	next(error);
};

export const prismaClientValidationError = (error, _req, _res, next) => {
	// TODO: add unique constraint error 'P2002'
	if (error instanceof PrismaClientValidationError) {
		const name = error.name;
		error.status = 400;
		error.title = name;
	}
	return next(error);
};

export const errorHandler = (error, req, res, _next) => {
	const status = error.status || 500;
	const title = error.title || "Internal Server Error";
	const err = error.message || "An error occurred while processing your request";

	const response = {
		data: null,
		success: false,
		title,
	};

	if (config.environment === "development") {
		response.stack = error.stack;
	}

	if (error.status === 400) {
		response.errors = error.errors;
	} else {
		response.error = err;
	}

	const { password, ...data } = req.body;

	const logContext = {
		method: req.method,
		url: req.originalUrl,
		ip: req.ip,
		userAgent: req.headers["user-agent"],
		userId: req.user?.id || "anonymous",
		body: data, // WARNING: sanitize sensitive fields
	};

	logger.error(`[${title} - ${err}]`, { logContext, response });
	return res.status(status).json(response);
};
