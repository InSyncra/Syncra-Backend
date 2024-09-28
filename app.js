require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const { initializeApp, cert } = require("firebase-admin/app");
const { FirebaseAuthError } = require("firebase-admin/auth");
const { FirebaseFirestoreError } = require("firebase-admin/firestore");
const serviceAccountKey = require("./config/serviceAccountKey.json");
const { environment, port, url } = require("./config");
const { validateUserInput } = require("./utils/validation");
// Initialize Firebase
initializeApp({
  credential: cert(serviceAccountKey),
});

const isProduction = environment === "production";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security
app.use(cors());

// All Routes
app.use(routes);

// ===========
// Error Handling forwarded from route next() functions
// ===========

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

// Firebase Errors
app.use((err, _req, _res, next) => {
  if (
    err instanceof FirebaseAuthError ||
    err instanceof FirebaseFirestoreError
  ) {
    err.title = "Firebase Error";
    err.status = 400;
    err.errors = { message: err.code };
    return next(err);
  } else {
    return next(err);
  }
});

// Error format or Internal Server Error
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);

  const errorRes = {
    title: err.title || "Server Error",
    message: err.message,
    errors: err.errors || "There was a problem with the server",
  };

  if (isProduction) {
    return res.json(errorRes);
  } else {
    errorRes.stack = err.stack;
    return res.json(errorRes);
  }
});

app.listen(port, () => {
  console.log(`Server now listening...visit ${url}/`);
});
