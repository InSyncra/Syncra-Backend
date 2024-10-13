require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { environment, port, frontendUrl, sessionSecret } = require("./config");
const session = require("express-session");
const apiRoutes = require("./routes");

const isProduction = environment === "production";

const app = express();

// middleware
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Security middleware
app.use(
  // Only requests from specified frontend URL (prod & dev) allowed
  // Check Syncra docs to see how to set up frontendUrl
  cors({
    origin: frontendUrl,
    credentials: true
  })
);

// Session authentication middleware
app.use(
  session({
    key: "syncra-session",
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: isProduction,
      maxAge: 60 * 60 * 24 * 30 // 30 days
    }
  })
);

// API routes
app.use("/api", apiRoutes);

// ===========
// TODO: Error Handling forwarded from route next() functions
// ===========

app.listen(port, () => {
  console.log("\n\n***********************************");
  console.log("***********************************");
  console.log(
    `Server is now listening on port ${port}. Test it out on http://localhost:${port}/`
  );
  console.log("***********************************");
  console.log("***********************************\n\n");
});
