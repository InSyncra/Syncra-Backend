import { Router } from "express";
import userRoutes from "./userRoutes.js";

const routes = Router();

routes.get("/", async (req, res) => {
	res.send(
		`<h1>Welcome to Syncra backend!</h1> <p>This project is designed for authorized users to clone and access the codebase. Instructions will be posted soon.</p>`,
	);
});

routes.use(userRoutes);

// for all unavailable routes
routes.use((req, res, next) => {
	const error = new Error("Requested resource not found");
	error.status = 404;
	error.title = "404 Not Found";
	next(error);
});

// error handler
routes.use((error, _req, res, _next) => {
	const status = error.status || 500;
	const title = error.title || "Internal Server Error";
	const message = error.message || "An error occurred while processing your request";
	console.error(error);
	res.status(status).json({ title, message, errors: error.errors, stack: error.stack });
});
export default routes;
