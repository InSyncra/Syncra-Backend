import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/auth.js";
import { validateRequestBody } from "../utils/validations/zod-error-formatter.js";
import { userCredentialSchema, userSchema } from "../utils/validations/zod-schemas.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 * @returns
 */
export async function signup(req, res, next) {
	validateRequestBody(userSchema, req, next);

	// try catch block to handle errors
	try {
		// remove the password from the request body by destructuring it
		const { password, ...userData } = req.body;

		// hash the password using bcrypt
		const hashedPassword = await bcrypt.hash(password, 10);

		// create a new user in the database
		const user = await prisma.user.create({
			data: {
				...userData,
				hashedPassword,
			},
		});

		// Generate token after creation so that user
		// doesn't have to sign in again
		// Set req.user to newly created user
		generateJWT(res, user);

		// send the user data as a response
		res.status(201).json(user);
	} catch (error) {
		// catch any errors and send a 500 status code with an error message
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
export async function login(req, res, next) {
	validateRequestBody(userCredentialSchema, req, next);
	const { credential, password } = req.body;

	try {
		const user = await prisma.user.findFirst({
			where: {
				OR: [{ email: credential }, { username: credential }],
			},
			select: {
				email: true,
				id: true,
				hashedPassword: true,
			},
		});

		if (!user) {
			const error = new Error("Invalid credentials");
			error.title = "Login Failed";
			error.status = 401;
			return next(error);
		}

		const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

		if (!isPasswordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// Generate token after sign in so that user can use Syncra
		const { hashedPassword, ...userPayload } = user;
		generateJWT(res, userPayload);

		return res.status(200).json({ message: "User logged in successfully" });
	} catch (error) {
		next(error);
	}
}

/**
 * Clears authentication token from user
 * @param {Request} _req
 * @param {Response} res
 * @returns
 */
export async function logout(_req, res) {
	res.clearCookie("token");
	return res.status(200).json({ message: "User logged out successfully" });
}
