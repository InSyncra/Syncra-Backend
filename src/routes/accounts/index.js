import { Router } from "express";
import { deleteUserById, getAllUsers, getUserById, updateUserById } from "../../controllers/accountsControllers.js";
import { requireAuth } from "../../utils/auth.js";

const userRoutes = Router();

// get all user accounts
userRoutes.get("/", getAllUsers);

// get user account by id
userRoutes.get("/:id", getUserById);

// update user account
userRoutes.put("/:id", requireAuth, updateUserById);

// delete user account
userRoutes.delete("/:id", requireAuth, deleteUserById);

export default userRoutes;
