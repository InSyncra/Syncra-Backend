import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../../lib/prisma"
import logger from "../../utils/logger"

passport.use(
	new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: {
					email,
				},
				omit: {
					hashedPassword: false,
				},
			});

			if (!user || !user.hashedPassword) {
				return done(null, false, { message: "Incorrect email or password" });
			}

			const isMatch = await bcrypt.compare(password, user?.hashedPassword);

			if (!isMatch) {
				return done(null, false, { message: "Incorrect email or password" });
			}

			const { hashedPassword, ...userData } = user;

			done(null, userData);
		} catch (error) {
			logger.error("Deserialization error", {
				error: error.message,
				stack: error.stack,
				timestamp: new Date().toISOString(),
			});
			done(error, false);
		}
	}),
);

// Add user id to session info to be used in future requests upon email/password authentication (above)
// See deserialize function below to see how this happens
passport.serializeUser((user, done) => {
	done(null, user?.id);
});

passport.deserializeUser(async (userId, done) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});

		if (!user) {
			return done(null, false);
		}

		done(null, user);
	} catch (error) {
		done(error, null);
	}
});
