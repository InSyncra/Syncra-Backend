/**
 * API Routes
 * Frontend will use the endpoint api/v1/{endpoint} in order to access
 * and retrieve required information
 *
 */

import express from "express";

const router = express.Router();

// Sample User Route
router.get("/users", async (req, res) => {
  // Get all users
  res.send("Found all users");
});

export default router;
