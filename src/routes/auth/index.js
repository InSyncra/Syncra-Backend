import { Router } from "express";
import { login, logout, signup } from "../../controllers/authControllers.js";

const authRoutes = Router();

// create a new user and authenticate them
authRoutes.post("/signup", signup);

// login a user: DEPRECATED
// authRoutes.post("/login", login);

// log user out (delete user session, not entire account)
// DEPRECATED
// authRoutes.delete("/logout", logout);

export default authRoutes;
