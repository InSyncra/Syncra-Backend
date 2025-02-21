/* 
    Functions to handle user authentication
*/
import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const isProduction = config.environment === "production";
const { secret, expiresIn } = config.jwtConfig;

// Create jwt token (login & signup)
export function generateJWT(res, user) {
	const token = jwt.sign({ id: user.id, email: user.email }, secret, {
		expiresIn: Number.parseInt(expiresIn),
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: isProduction,
		expires: Number.parseInt(expiresIn) * 1000,
	});

	return token;
}

// Restore user session
export function restoreUserSession(req, res, next) {
	const { token } = req.cookies;
	req.user = null;

	if (!token) {
		res.clearCookie("token");
		return next();
	}

	const decoded = jwt.verify(token, secret);

	if (decoded) {
		req.user = decoded;
	}

	return next();
}

// Routes that require auth
export function requireAuth(req, res, next) {
	if (!req.user) {
		const error = new Error("This route requires authentication");
		error.status = 401;
		error.title = "Unauthorized";
		res.clearCookie("token");
		return next(error);
	}

	return next();
}
