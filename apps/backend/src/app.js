import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import config from "../config/index.js";
import routes from "./routes/index.js";

const isProduction = config.environment === "production";

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

// Connect all the routes
app.use(routes);

export default app;
