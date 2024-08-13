const User = require("../models/User");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Ticket = require("../models/Ticket");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/email");
const crypto = require("crypto");

// @desc    Register new seller
// @route   POST /api/sellers
// @access  Public
const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "seller",
  });

  if (user) {
    const verificationToken = user.generateVerificationToken();
    await user.save();

    const verificationUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/sellers/verify/${verificationToken}`;
    const message = `Please verify your email by clicking the following link: ${verificationUrl}`;

    await sendEmail({
      to: email,
      subject: "Email Verification",
      text: message,
    });
    res.status(201).json({
      message: "Please verify your email",
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Verify seller email
// @route   GET /api/sellers/verify/:token
// @access  Public
const verifySeller = asyncHandler(async (req, res) => {
  console.log(req.params.token);
  const verificationToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    verificationToken,
    isVerified: false,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(200).json({
    message: "Email verified successfully",
  });
});

// @desc    Authenticate seller & get token
// @route   POST /api/sellers/login
// @access  Public
const authSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      res.status(400);
      throw new Error("Email not verified");
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

module.exports = {
  registerSeller,
  verifySeller,
  authSeller,
};
