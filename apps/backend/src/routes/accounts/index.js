import { Router } from "express";
import {
	deleteUserById,
	getAllUsers,
	getUserById,
	login,
	logout,
	signup,
	updateUserById,
} from "../../controllers/accountsControllers.js";
import { requireAuth } from "../../utils/auth.js";
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
userRoutes.put("/:id", requireAuth, validateUser, updateUserById);

// log user out (delete user session, not entire account)
userRoutes.delete("/", logout);

// delete user account
userRoutes.delete("/:id", requireAuth, deleteUserById);

export default userRoutes;
