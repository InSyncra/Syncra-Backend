import pgSession from "connect-pg-simple";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import pg from "pg";
import config from "../config/index"
import routes from "../routes/index"

const allowedOrigins = ["https://syncra-frontend.vercel.app", "http://localhost:5173", "http://127.0.0.1:5173"];

const { auth, dbUrl, environment } = config;

const isProduction = environment === "production";

// PGSession for storing authentication sessions
const pgPool = new pg.Pool({
	connectionString: dbUrl,
});

const PGSession = pgSession(session);

export default function createServer() {
	const app = express();

	app.use(
		helmet({
			contentSecurityPolicy: false,
			crossOriginEmbedderPolicy: false,
		}),
	);

	app.use(
		cors({
			credentials: true,
			origin: allowedOrigins,
		}),
	);

	// NEW SETUP FOR AUTHENTICATION 5-20-25
	app.use(
		session({
			secret: auth.sessionSecret,
			resave: false, // Only resave when session changes
			saveUninitialized: false, // Don't save uninitialized sessions
			//Save session in database
			// In the future this will be a REDIS cache
			store: new PGSession({
				pool: pgPool,
				tableName: "user_sessions",
				createTableIfMissing: true,
			}),
			cookie: {
				httpOnly: true,
				secure: isProduction,
				sameSite: isProduction && "none",
				maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
			},
		}),
	);

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(morgan("common"));

	// Send welcome to let others know this is the correct Syncra route
	app.get("/", async (req, res) => {
		res.send(
			`<h1>Welcome to Syncra backend!</h1> <p>This project is designed for authorized users to clone and access the codebase. Instructions will be posted soon.</p>`,
		);
	});

	// Connect all the routes
	app.use("/api/v1", routes);

	return app;
}
