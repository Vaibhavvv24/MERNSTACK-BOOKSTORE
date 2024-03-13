import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import Book from "../models/Book.js";
import { sendEmail } from "../utils/sendEmail.js";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json("You can update only your account");
  }
  try {
    if (req.body.password) {
      req.body.password = await bcryptjs.hash(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          //avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    res.status(403).json("You can delete only your account");
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  } catch (err) {
    next(err);
  }
};

export const getUserBooks = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json("You can update only your account");
  } else {
    try {
      const books = await Book.find({ admin: req.params.id });
      res.status(200).json(books);
    } catch (err) {
      next(err);
    }
  }
};
export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const Forgot = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json("User not found");
    }
    const resetToken = user.generateToken();
    const message = `Please click on the link below to reset your password \n\n ${process.env.CLIENT_URL}/reset/${resetToken}`;
    await sendEmail(
      user.email,
      "reset password link for Vaibhav Book Store",
      message
    );

    res.status(200).json({ message: `Reset token sent to ${user.email} ` });
  } catch (err) {
    next(err);
  }
};
export const Reset = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
