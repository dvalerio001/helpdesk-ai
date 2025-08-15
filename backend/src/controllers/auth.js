import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET || "change-me";
const JWT_EXPIRES_IN = "7d";

async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      const err = new Error("Email already in use");
      err.statusCode = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (err) {
    next(err);
  }
}

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      throw err;
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }
    res.json({ _id: user._id, name: user.name, email: user.email });
  } catch (err) {
    next(err);
  }
}

export { signup, signin, getMe };