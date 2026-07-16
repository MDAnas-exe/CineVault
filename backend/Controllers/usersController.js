import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import users from "../Models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = expressAsyncHandler(async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password || !name) {
    res.status(400);
    throw new Error("Please add credentials");
  }
  const userExists = await users.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await users.create({
    name,
    email,
    password: hashedPassword,
  });

  res
    .status(201)
    .json({ id: user._id, name, email, token: generateToken(user._id) });
});

const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const user = await users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      id: user._id,
      name: user.name,
      email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: `30d` });
};

export { registerUser, loginUser };
