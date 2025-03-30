import { Router } from "express";
import config from "../../config/index.js";
import { restoreUserSession } from "../utils/auth.js";
import { PrismaClientValidationError } from "../utils/prisma.js";
import userRoutes from "./accounts/index.js";
import authRoutes from "./auth/index.js";
import projectRoutes from "./projects/index.js";

const routes = Router();

// Before every route, check if the user is authenticated
// Adds req.user to request to compare details
routes.use(restoreUserSession);

routes.get("/", async (req, res) => {
	res.send(
		`<h1>Welcome to Syncra backend!</h1> <p>This project is designed for authorized users to clone and access the codebase. Instructions will be posted soon.</p>`,
	);
});

// Route Imports here
routes.use("/auth", authRoutes);
routes.use("/accounts", userRoutes);
routes.use("/projects", projectRoutes);

// for all unavailable routes
routes.use((_req, _res, next) => {
	const error = new Error("Requested resource not found");
	error.status = 404;
	error.title = "404 Not Found";
	next(error);
});

// check for Prisma Validation Errors
routes.use((error, _req, _res, next) => {
	if (error instanceof PrismaClientValidationError) {
		const name = error.name;
		error.status = 400;
		error.title = name;
	}
	return next(error);
});

// error handler
routes.use((error, _req, res, _next) => {
	const status = error.status || 500;
	const title = error.title || "Internal Server Error";
	const message = error.message || "An error occurred while processing your request";

	const response = {
		status,
		title,
		message,
	};
	if (config.environment === "development") {
		response.stack = error.stack;
	}

	if (error.errors) {
		response.errors = error.errors;
	}
	console.error(response);
	return res.status(status).json(response);
});

export default routes;
