import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import { Router } from "express";
import { check } from "express-validator";
import { handleValidationErrors } from "../utils/validation.js";

const userRoutes = Router();

// run the check and validation for required fields
/*
	birthday
	profession optional
	skill level
	avatar optional url
	bio is length 1000 max min 10
	github optional url
	past projects links optional array
 */
const validateUser = [
	check("firstName").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid first name"),
	check("lastName").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid last name"),
	check("nickname").optional(),
	check("username").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid username"),
	check("email").exists({ checkFalsy: true }).isEmail().withMessage("Please provide a valid email"),
	check("birthdate").exists({ checkFalsy: true }).isString().withMessage("Please provide a valid birthday"),
	check("profession").optional(),
	check("skillLevel").optional().isString().withMessage("Please provide a valid skill level"),
	check("avatar").optional(),
	check("bio").optional().isString().isLength({ min: 10, max: 1000 }),
	check("githubUrl").optional(),
	check("pastProjects").optional().isArray(),

	handleValidationErrors,
];
// create a new user
userRoutes.post("/signup", validateUser, async (req, res, next) => {
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
});

// get user account
userRoutes.get("/accounts/:id", async (req, res, next) => {
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
});

// get all user accounts
userRoutes.get("/accounts", async (req, res, next) => {
	try {
		const users = await prisma.user.findMany();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

// update user account
userRoutes.put("/accounts/:id", validateUser, async (req, res, next) => {
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
});

// delete user account
userRoutes.delete("/accounts/:id", async (req, res, next) => {
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
});

export default userRoutes;
