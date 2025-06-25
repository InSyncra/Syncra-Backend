import dotenv from "dotenv";
dotenv.config();
export default {
	environment: process.env.NODE_ENV || "development",
	port: process.env.PORT || 8000,
	auth: {
		// TODO: Implement google auth
		sessionSecret: process.env.SESSION_SECRET,
	},
	frontendUrl: process.env.FRONTEND_URL,
	stripe: {
		secretKey: process.env.STRIPE_SECRET_KEY,
		webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
	},
	jwtConfig: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
	dbUrl: process.env.DATABASE_URL,
};
