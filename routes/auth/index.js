const sessionRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const saltRounds = 10;

// Check if user is logged in
// This route can be accessed to check if the user is logged in or not
sessionRouter.get("/current", (req, res) => {
  if (req.session.user) {
    res.json({
      loggedIn: true,
      user: req.session.user
    });
  } else {
    res.json({ loggedIn: false });
  }
});

// Register a new user
sessionRouter.post("/register", (req, res) => {
  const user = req.body;

  // Hash password then save user to database
  bcrypt.hash(user.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error creating user", success: false });
    }

    res.status(201).json({ user: newUser, success: true, error: false });
  });
});

//Login a user via username/email and password
// This route can be accessed to login a user
// It will check if the user exists in the database and if the password is correct
sessionRouter.post("/login", restoreSession, (req, res) => {
  const { credential, password } = req.body;

  if (!existingUser)
    return res
      .status(401)
      .json({ error: "Invalid credentials", success: false });

  bcrypt.compare(password, existingUser.password, (err, isMatch) => {
    if (err)
      return res
        .status(500)
        .json({ error: "Error logging in", success: false });

    if (isMatch) {
      req.session.user = existingUser;
      return res
        .status(200)
        .json({ success: true, error: false, user: existingUser });
    } else {
      req.session.user = null;
      return res
        .status(401)
        .json({ error: "Invalid credentials", success: false });
    }
  });
});

// Logout a user
// This route can be accessed to logout a user
// It will destroy the session
sessionRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Error logging out", success: false });
    }
    res.clearCookie("syncra-session");
    console.log("User logged out successfully");
    return res.status(200).json({ success: true, error: false });
  });
});

module.exports = sessionRouter;
