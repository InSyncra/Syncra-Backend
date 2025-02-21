import {
	deleteUserById,
	getAllUsers,
	getUserById,
	updateUserById,
	signup,
	login,
	logout,
} from "../../controllers/accountsControllers.js";
import { Router } from "express";
import { validateLogin, validateUser } from "../../utils/validations/user.js";
const userRoutes = Router();

// get all user accounts
userRoutes.get("/", getAllUsers);

// create a new user and authenticate them
userRoutes.post("/signup", validateUser, signup);

// login a user
userRoutes.post("/login", validateLogin, login);

// get user account
userRoutes.get("/:id", getUserById);

// update user account
userRoutes.put("/:id", validateUser, updateUserById);

// log user out (delete user session, not entire account)
userRoutes.delete("/", logout);

// delete user account
userRoutes.delete("/:id", deleteUserById);

export default userRoutes;
