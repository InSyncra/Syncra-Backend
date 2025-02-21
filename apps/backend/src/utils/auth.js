import { prisma } from "@repo/db";
/* 
    Functions to handle user authentication
*/
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const isProduction = config.environment === "production";
const { secret, expiresIn } = config.jwtConfig;

// Create and set jwt token in cookies (login & signup)
export function generateJWT(res, user) {
	const token = jwt.sign({ id: user.id, email: user.email }, secret, {
		expiresIn: Number.parseInt(expiresIn), // 604,800 seconds = 1 week
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: isProduction,
		maxAge: Number.parseInt(expiresIn) * 1000,
		sameSite: isProduction && "Lax",
	});

	return token;
}

// Restore user session
export function restoreUserSession(req, res, next) {
	const { token } = req.cookies;
	req.user = null;

	return jwt.verify(token, secret, null, async (err, payload) => {
		if (err) {
			return next();
		}

		try {
			const { id } = payload.data;
			req.user = await prisma.user.findUnique({
				where: {
					id,
				},
				select: {
					id: true,
					email: true,
				},
			});
		} catch (e) {
			res.clearCookie("token");
			return next();
		}
	});
}

// Routes that require auth
export function requireAuth(req, _res, next) {
	if (!req.user) {
		const error = new Error("This route requires authentication");
		error.status = 401;
		error.title = "Unauthorized";
		return next(error);
	}

	return next();
}
