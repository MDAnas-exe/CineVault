import expressAsyncHandler from "express-async-handler";
import users from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendEmail.js";

const registerController = expressAsyncHandler(async (req, res) => {
  const { email, password, name } = req.body || {};

  let user = await users
    .findOne({ email })
    .select("_id email isVerified")
    .lean();

  if (user?.isVerified) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  if (user) {
    await users.updateOne(
      { email },
      { $set: { name, password: hashedPassword } },
    );
  } else {
    user = await users.create({ name, email, password: hashedPassword });
  }

  await sendVerificationEmail(user, res);

  res
    .status(201)
    .json({ message: "Please check your email to verify your account" });
});

const loginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  const user = await users.findOne({ email }).lean();
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  if (user.isVerified) {
    res.cookie("token", generateToken(user._id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login Successful!",
    });
  } else {
    await sendVerificationEmail(user, res);

    res.status(401).json({
      message:
        "Account not verified.Please check your email to verify your account",
    });
  }
});

const verifyEmail = expressAsyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.status(400);
    throw new Error("No Token! Token required");
  }

  let id;
  try {
    ({ id } = jwt.verify(token, process.env.JWT_SECRET));
  } catch (err) {
    res.status(400);
    if (err.name === "TokenExpiredError") {
      throw new Error("Verification link has expired, please sign up again");
    }
    throw new Error("Invalid verification link");
  }

  const user = await users.findById(id).select("name email -_id").lean();
  if (!user) {
    res.status(400);
    throw new Error("User doesnt exist");
  }

  await users.updateOne({ _id: id }, { $set: { isVerified: true } });

  res.json({
    message: "Email verified!",
  });
});

const logoutController = expressAsyncHandler(async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.sendStatus(204);
});

export { registerController, loginController, verifyEmail, logoutController };

const generateToken = (id, expiresIn = "30d") => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: expiresIn });
};

const sendVerificationEmail = async (user, res) => {
  const verificationToken = generateToken(user._id, "1d");
  try {
    await sendMail(
      user.email,
      "Verify your CineVault Account",
      `<div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; text-align: center;">
  <h2 style="color: #111827; font-size: 22px; margin-bottom: 12px;">Welcome to CineVault</h2>
  <p style="color: #6B7280; font-size: 14px; line-height: 22px; margin-bottom: 24px;">Click the link below to verify your email address:</p>
  <a href="${process.env.CLIENT_URL}/verify-email?token=${verificationToken}" style="display: inline-block; background-color: #d4a017; color: #111827; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 10px; font-size: 14px;">Verify Email</a>
  <p style="color: #9CA3AF; font-size: 12px; margin-top: 24px;">This link expires in 24 hours.</p>
</div>`,
    );
  } catch {
    res.status(500);
    throw new Error("Failed to send verification email, please try again");
  }
};
