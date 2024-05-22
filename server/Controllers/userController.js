const UserModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const UnverifiedUserModle = require("../Models/unVerifiedUserModel");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (name, email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Verification OTP Code",
    text: `Hello ${name}, Your Verification code is ${otp}. Please do not Share this to anyone`,
  };

  await transporter.sendMail(mailOptions);
};

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ message: "User already exists. Please log in." });
    }

    const existingUnverifiedUser = await UnverifiedUserModle.findOne({ email });
    if (existingUnverifiedUser) {
      if (existingUnverifiedUser.otpExpiry < Date.now()) {
        await UnverifiedUserModle.deleteOne({ email });
      } else {
        return res
          .status(400)
          .send({ message: "OTP already sent. Please verify your email." });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid 10 minutes

    const unverifiedUser = new UnverifiedUserModle({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry,
    });

    await unverifiedUser.save();
    await sendOTPEmail(name, email, otp);

    res
      .status(201)
      .send({ message: "User registered successfully. OTP sent to email." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Issue" });
  }
};

const VerifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    let unverifiedUser = await UnverifiedUserModle.findOne({ email });

    if (
      !unverifiedUser ||
      unverifiedUser.otp !== otp ||
      unverifiedUser.otpExpiry < Date.now()
    ) {
      return res.status(400).json({ msg: "Invalid or expired OTP" });
    }

    const user = new UserModel({
      name: unverifiedUser.name,
      email: unverifiedUser.email,
      password: unverifiedUser.password,
    });

    await user.save();
    await UnverifiedUserModle.deleteOne({ email });
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .send({ message: "User Successfully Registered", token, user });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Issue" });
  }
};

const login = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Internal Server Issue" });
  }
};
//  const register = async (req, res) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Internal Server Issue" });
//   }
// };
module.exports = { register, VerifyOtp, login };
