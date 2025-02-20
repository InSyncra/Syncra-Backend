import {
	deleteUserById,
	getAllUsers,
	getUserById,
	signUpUser,
	updateUserById,
} from "../../controllers/accountsControllers.js";
import { Router } from "express";
import { validateUser } from "../../utils/validations/user.js";

const userRoutes = Router();

// create a new user
userRoutes.post("/signup", validateUser, signUpUser);

// get user account
userRoutes.get("/:id", getUserById);

// get all user accounts
userRoutes.get("/", getAllUsers);

// update user account
userRoutes.put("/:id", validateUser, updateUserById);

// delete user account
userRoutes.delete("/:id", deleteUserById);

export default userRoutes;
