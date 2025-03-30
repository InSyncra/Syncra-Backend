import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import routes from "./routes/index.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

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

export default app;
