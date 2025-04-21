import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import config from "../config/index.js";
const { port, environment } = config;

import routes from "./routes/index.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const allowedOrigins = ["https://syncra-frontend.vercel.app", "http://localhost:5173", "http://127.0.0.1:5173"];

const corsOptions = {
	origin: (origin, cb) => {
		if (!origin) return cb(null, true); // for mobile apps/curl req
		if (!allowedOrigins.includes(origin)) {
			return cb(new Error("Not allowed by CORS"));
		}
		return cb(null, true);
	},
	credentials: true,
};

app.use(cors(corsOptions));

app.use(
	helmet.crossOriginResourcePolicy({
		policy: "cross-origin",
	}),
);

// Send welcome to let others know this is the correct Syncra route
app.get("/", async (req, res) => {
	res.send(
		`<h1>Welcome to Syncra backend!</h1> <p>This project is designed for authorized users to clone and access the codebase. Instructions will be posted soon.</p>`,
	);
});

// Connect all the routes
app.use("/api/v1", routes);

app.listen(port, () => {
	if (environment === "development") {
		console.log("\n\n***********************************");
		console.log("***********************************");
		console.log(`Server is now listening on port ${port}. Test it out on http://localhost:${port}/`);
		console.log("***********************************");
		console.log("***********************************\n\n");
	} else {
		console.log("\n\n***********************************");
		console.log("***********************************");
		console.log(`Server is now listening on port ${port}.`);
		console.log("***********************************");
		console.log("***********************************\n\n");
	}
});

export default app;
