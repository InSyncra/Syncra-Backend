import dotenv from "dotenv";
dotenv.config();
export default {
	environment: process.env.NODE_ENV || "development",
	port: process.env.PORT || 8000,
	jwtConfig: {
		secret: process.env.JWT_SECRET,
		expiresIn: process.env.JWT_EXPIRES_IN,
	},
};
