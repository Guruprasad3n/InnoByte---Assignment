const express = require("express");
const { register, VerifyOtp } = require("../Controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/verify-signup-otp", VerifyOtp);

module.exports = router;
