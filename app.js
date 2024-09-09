import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { default as cookieParser } from "cookie-parser";
import { ValidationError } from "sequelize";
import { default as config } from "./config";

const { environment } = config;

const isProduction = environment === "production";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(cookieParser);
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// error handling

// 404 error
app.use((_req, _res, next) => {
  const err = new Error("Not Found");
  err.title = "Resource Not Found";
  err.errors = {
    message: "The resource you requested could not be found.",
  };
  err.status = 404;
  next(err);
});

// validation errors
app.use((err, _req, res, next) => {
  if (err instanceof ValidationError) {
    let errors = {};
    for (const error of err.errors) {
      errors[error.path] = error.message;
    }

    err.title = "Validation error";
    err.errors = errors;
  }

  next(err);
});

// catch all errors
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack,
  });
});
