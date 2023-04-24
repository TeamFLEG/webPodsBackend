// Description: This file contains the routes for the authentication system
// Routes available: /login, /register

const express = require("express");
const router = express.Router();

// Import the login and register middleware functions
const { login, register, authenticateUser } = require("../middlewares/auth/auth");
const { googleAuth, getURL } = require("../middlewares/auth/oauth");

// Get requests

// Post requests
router.post("/login", login);
router.post("/register", register);
router.post("/refresh", authenticateUser)
router.post("/googleAuth", googleAuth);
router.post("/google/getURL", getURL);

module.exports = router;