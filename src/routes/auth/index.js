import { Router } from "express";
import passport from "passport";
import { getCurrentUser, logout, signup } from "../../controllers/authControllers.js";
import "../../lib/passport/local.js";
import { validate } from "../../middlewares/validate.js";
import { LoginSchema, UserSchema } from "../../schemas/user.js";
import { sendErrorResponse, sendSuccessResponse } from "../../utils/responses.js";

const authRoutes = Router();

// get current authenticated user
authRoutes.get("/me", getCurrentUser);

// create a new user and authenticate them
authRoutes.post("/signup", validate(UserSchema), signup);

// login a user: DEPRECATED
// authRoutes.post("/login", login);

authRoutes.post("/login", validate(LoginSchema), async (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			next(err);
			return;
		}

		if (!user) {
			sendErrorResponse(res, { status: 400, error: "Incorrect email or password" });
			return;
		}

		req.login(user, (err) => {
			if (err) {
				next(err);
				return;
			}

			sendSuccessResponse(res, { data: user });
		});
	})(req, res);
});

// log user out (deletes user session, not entire account)
authRoutes.post("/logout", logout);

export default authRoutes;
