import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";

export async function signUpUser(req, res, next) {
	// try catch block to handle errors
	try {
		// hash the password using bcrypt
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// remove the password from the request body
		delete req.body.password;

		// create a new user in the database
		const user = await prisma.user.create({
			data: {
				...req.body,
				hashedPassword,
			},
		});
		// send the user data as a response
		res.status(201).json(user);
	} catch (error) {
		// catch any errors and send a 500 status code with an error message
		next(error);
	}
}

export async function getAllUsers(req, res, next) {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		next(error);
	}
}

export async function getUserById(req, res, next) {
	// get the user id from the request parameters
	const { id } = req.params;

	// try catch block to handle errors
	try {
		// get the user from the db
		const user = await prisma.user.findUnique({
			where: {
				id: id,
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

export async function updateUserById(req, res, next) {
	const { id } = req.params;
	const userId = id;

	try {
		// Check if the user exists
		const existingUser = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!existingUser) {
			return res.status(404).json({ error: "User not found" });
		}

		// Update the user in the database with only the provided fields
		const updatedUser = await prisma.user.update({
			where: { id: userId },
			data: req.body,
		});

		res.status(200).json(updatedUser);
	} catch (error) {
		next(error);
	}
}

export async function deleteUserById(req, res, next) {
	const { id } = req.params;
	const userId = id;

	try {
		// Check if the user exists
		const existingUser = await prisma.user.findUnique({
			where: { id: userId },
		});

		if (!existingUser) {
			return res.status(404).json({ error: "User not found" });
		}

		// Delete the user from the database
		await prisma.user.delete({
			where: { id: userId },
		});
		const message = { message: "account deleted successfully" };
		res.status(200).json(message);
	} catch (error) {
		next(error);
	}
}
