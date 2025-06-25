import bcrypt from "bcryptjs";
import passport from "passport";
import { prisma } from "../lib/prisma"
import logger from "../utils/logger"
import { sendSuccessResponse } from "../utils/responses"
// import { validateRequestBody } from "../utils/validations/zod-error-formatter"

export async function getCurrentUser(req, res, next) {
	try {
		if (!req.user || typeof req.isAuthenticated !== "function" || !req.isAuthenticated()) {
			return sendSuccessResponse(res, { data: null });
		}
		return sendSuccessResponse(res, { data: req.user });
	} catch (error) {
		next(error);
	}
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns
 */
// export async function signup(req, res, next) {
// 	if (!req.auth.userId) {
// 		return res.status(400).json(sendResponse({ error: "Missing required token for authentication" }));
// 	}

// 	validateRequestBody(userSchema, req, next);

// 	// try catch block to handle errors
// 	try {
// 		// remove the password from the request body by destructuring it
// 		const userData = req.body;

// 		// hash the password using bcrypt
// 		// const hashedPassword = await bcrypt.hash(password, 10);

// 		// create a new user in the database
// 		const user = await prisma.user.create({
// 			data: {
// 				...userData,
// 				clerkId: req.auth.userId,
// 			},
// 		});

// 		// Generate token after creation so that user
// 		// doesn't have to sign in again
// 		// Set req.user to newly created user
// 		// generateJWT(res, user);

// 		// send the user data as a response
// 		res.status(201).json(sendResponse({ data: user }));
// 	} catch (error) {
// 		// catch any errors and send a 500 status code with an error message
// 		next(error);
// 	}
// }

export async function signup(req, res, next) {
	const { password, ...userData } = req.body;

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await prisma.user.create({
			data: {
				...userData,
				hashedPassword,
			},
		});

		// UPDATE: Log the user in immediately after signup: May change if we implement email confirmation
		// Then send the response and session to client
		req.login(newUser, (err) => {
			if (err) {
				return next(err);
			}
			logger.info(`[New User Created]:`, { ...newUser });
			sendSuccessResponse(res, { data: newUser, status: 201 });
		});
		return;
	} catch (error) {
		next(error);
	}
}

/**
 * DEPRECATED: This route is no longer needed
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns
 */
// export async function login(req, res, next) {
// 	validateRequestBody(userCredentialSchema, req, next);
// 	const { credential, password } = req.body;

// 	try {
// 		const user = await prisma.user.findFirst({
// 			where: {
// 				OR: [{ email: credential }, { username: credential }],
// 			},
// 			select: {
// 				email: true,
// 				id: true,
// 				hashedPassword: true,
// 			},
// 		});

// 		if (!user) {
// 			const error = new Error("Invalid credentials");
// 			error.title = "Login Failed";
// 			error.status = 401;
// 			return next(error);
// 		}

// 		const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

// 		if (!isPasswordMatch) {
// 			return res.status(401).json({ message: "Invalid credentials" });
// 		}

// 		// Generate token after sign in so that user can use Syncra
// 		const { hashedPassword, ...userPayload } = user;
// 		const token = generateJWT(res, userPayload);

// 		return res.status(200).json({ data: { token }, error: null, success: true });
// 	} catch (error) {
// 		next(error);
// 	}
// }

// export async function login(req, res, next) {
// 	const ip = req.ip;
// 	const userAgent = req.headers["user-agent"];
// 	const email = req.body.email;

// 	passport.authenticate("local", (err, user, info) => {
// 		if (err) {
// 			logger.error("Login error", {
// 				email,
// 				ip,
// 				userAgent,
// 				error: err.message,
// 				stack: err.stack,
// 				timestamp: new Date().toISOString(),
// 			});
// 			return next(err);
// 		}

// 		if (!user) {
// 			logger.warn(`[Login Failure]:`, {
// 				email,
// 				ip,
// 				userAgent,
// 				reason: info?.message || "Unknown",
// 				timestamp: new Date().toISOString(),
// 			});
// 			return sendErrorResponse(res, { status: 400, error: info });
// 		}

// 		req.login(user, (err) => {
// 			if (err) {
// 				next(err);
// 				return;
// 			}

// 			// Log user signin; FUTURE TODO: match req.ip address to know addresses
// 			logger.info("[Successful Login]", {
// 				userId: user.id,
// 				email: user.email,
// 				ip,
// 				userAgent,
// 				timestamp: new Date().toISOString(),
// 			});

// 			sendSuccessResponse(res, { data: user });
// 		});
// 	})(req, res);
// }

/**
 * DEPRECATED: No longer needed
 * Clears authentication token from user
 * @param {Request} _req
 * @param {Response} res
 * @returns
 */
// export async function logout(_req, res) {
// 	res.clearCookie("token");
// 	return res.status(200).json({ message: "User logged out successfully" });
// }

export async function logout(req, res, next) {
	req.logout((error) => {
		if (error) {
			return next(error);
		}

		return res.sendStatus(204);
	});
}
