import { prisma } from "../utils/prisma.js";
import { validateRequestBody } from "../utils/validations/zod-error-formatter.js";
import { userUpdateSchema } from "../utils/validations/zod-schemas.js";

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export async function getAllUsers(req, res, next) {
	// TODO: Implement req.query for pagination and filtering on getAllUsers
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		next(error);
	}
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export async function getUserById(req, res, next) {
	// get the user id from the request parameters
	const { id } = req.params;

	// try catch block to handle errors
	try {
		// get the user from the db
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
		});
		// if the user is not found, send a 404 status code
		if (!user) {
			res.status(404).send("User not found");
			return;
		}
		// respond with the user data
		res.json(user);
	} catch (error) {
		next(error);
	}
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export async function updateUserById(req, res, next) {
	// You can validate with just id. No need to convert to a new variable
	const { id } = req.params;

	// Every request checks if there's a user and returns the user object
	// class ReqUserObject {id, email}
	// So you will always have access to this per request
	// Since id is used, we can convert id from req.user to userId
	const { id: userId } = req.user;

	// Only the currently logged in user can update the user based on id in req.params
	if (id !== userId) return res.status(403).json({ message: "Forbidden" });

	validateRequestBody(userUpdateSchema, req, next);

	try {
		// Check if the user exists
		// Unfortunately, we always have to check before updating
		const existingUser = await prisma.user.findUnique({
			// Shorthand: since the key is the same as the value we can just do id instead of id: id
			where: { id },
		});

		if (!existingUser) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update the user in the database with only the provided fields
		const updatedUser = await prisma.user.update({
			where: { id },
			data: req.body,
		});

		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
}

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
export async function deleteUserById(req, res, next) {
	const { id } = req.params;
	const { id: userId } = req.user;

	if (id !== userId) return res.status(403).json({ message: "Forbidden" });

	try {
		// Check if the user exists
		const existingUser = await prisma.user.findUnique({
			where: { id },
		});

		if (!existingUser) {
			return res.status(404).json({ error: "User not found" });
		}

		// Delete the user from the database
		await prisma.user.delete({
			where: { id },
		});

		res.clearCookie("token");
		const message = { message: "Account deleted successfully" };
		res.status(200).json(message);
	} catch (error) {
		next(error);
	}
}
