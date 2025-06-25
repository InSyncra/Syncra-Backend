import { Router } from "express";
import { deleteUserById, getAllUsers, getUserById, updateUserById } from "../../controllers/accountsControllers"
import { requireAuth } from "../../middlewares/auth"
// import { requireAuth } from "../../utils/auth"

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
