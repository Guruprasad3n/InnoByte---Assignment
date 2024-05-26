const express = require("express");
const {
  register,
  VerifyOtp,
  login,
  loginOtpVerify,
  editUser,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/verify-signup-otp", VerifyOtp);
router.post("/login", login);
router.post("/verify-login", loginOtpVerify);
router.put("/edit-user/:id", editUser);

module.exports = router;
