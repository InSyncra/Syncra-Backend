import { prisma } from "@repo/db";
import bcrypt from "bcryptjs";
import { generateJWT } from "../utils/auth.js";
import {z} from "zod";


const userSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	nickname: z.string().optional(),
	username: z.string(),
	email: z.string().email(),
	password: z.string(),
	birthday: z.string(),
	profession: z.string().optional(),
	avatar: z.string().optional(),
	bio: z.string().optional(),
	githubUrl: z.string().optional(),
});



export async function signup(req, res, next) {
	const {error} = userSchema.safeParse(req.body);
	if(error){
		next(error)
		return;
	}
	// try catch block to handle errors
	try {
		// hash the password using bcrypt
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// remove the password from the request body
		const { password, ...userData } = req.body;

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

export async function login(req, res, next) {
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
			const error = new Error("The provided credentials were invalid.");
			error.title = "Login Failed";
			error.status = 401;
			return next(error);
		}

		const isPasswordMatch = await bcrypt.compare(password, user.hashedPassword);

		if (!isPasswordMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		// // Generate token after sign in so that user can use Syncra
		const { hashedPassword, ...userPayload } = user;
		console.log(userPayload);
		generateJWT(res, userPayload);

		return res.status(200).json({ message: "User logged in successfully" });
	} catch (error) {
		next(error);
	}
}

export async function logout(_req, res) {
	res.clearCookie("token");
	return res.status(200).json({ message: "User logged out successfully" });
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
	const { error} = userSchema.safeParse(req.body);
	if(error){
		next(error)
		return;
	}

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

		res.clearCookie("token");
		const message = { message: "account deleted successfully" };
		res.status(200).json(message);
	} catch (error) {
		next(error);
	}
}
