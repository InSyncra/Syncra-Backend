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

	if (!token) return next();

	return jwt.verify(token, secret, null, async (err, payload) => {
		if (err) {
			return next();
		}

		try {
			const { id } = payload;
			const user = await prisma.user.findUniqueOrThrow({
				where: {
					id,
				},
				select: {
					id: true,
					email: true,
				},
			});
			req.user = new ReqUserObject(user.id, user.email);
			console.log(`[${new Date().toISOString()}] Request from User ${user.id}`);
			return next();
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

/**
 * Info of currently logged in user used for request validations and authorizations
 */
class ReqUserObject {
	/**
	 *
	 * @param {string} id - User Id retrieved from database
	 * @param {string} email - User' email retrieved from database
	 */
	constructor(id, email) {
		this.id = id;
		this.email = email;
	}
}
