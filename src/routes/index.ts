import express from "express";
import { errorHandler, prismaClientValidationError, resourceNotFoundError } from "../middlewares/errorHandlers"
import userRoutes from "./accounts/index"
import authRoutes from "./auth/index"
import commentRoutes from "./comments/index"
import projectRoutes from "./projects/index"
import router from "./webhooks/stripe"
const routes = express.Router();

/*
	TO RUBEN: When you add your webhooks, add them before the express.json() middleware.

	Stripe requires the raw json format, and express.json() parses to an actual JS Object, which for some reason errors out when both middlewares are used.
*/
routes.use("/webhooks/stripe", router);
routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

// Send welcome to let others know this is the correct Syncra route
routes.get("/", async (req, res) => {
	res.send(
		`<h1>Welcome to Syncra backend!</h1> <p>This project is designed for authorized users to clone and access the codebase. Instructions will be posted soon.</p>`,
	);
});

// Route Imports here
routes.use("/auth", authRoutes);

// Adds req.user to request to compare details
// DEPRECATED: Handled by passport
// routes.use(restoreUserSession);

routes.use("/accounts", userRoutes);
routes.use("/projects", projectRoutes);
routes.use("/comments", commentRoutes);

// Health check to make sure server is still running
router.get("/health", (_, res) => {
	res.sendStatus(200);
});

// for all unavailable routes
routes.use("*", resourceNotFoundError);

// check for Prisma Validation Errors
routes.use(prismaClientValidationError);

// error handler
routes.use(errorHandler);

export default routes;
