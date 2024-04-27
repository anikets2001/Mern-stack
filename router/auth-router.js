const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controller")

// for home page
router.route("/").get(authcontrollers.home);

// for registration page
router.route("/register").get(authcontrollers.register);

module.exports = router;
