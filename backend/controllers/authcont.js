import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const user = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await user.save();
    res
      .status(201)
      .json({ message: "User created successfully!", success: true, user });
  } catch (err) {
    res.status(409).json({ message: err.message, success: false });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      res.status(404).json({ message: "User not found", success: false });
    console.log(user);
    console.log(password);
    console.log(user.password);
    const validity = await bcryptjs.compare(password, user.password);
    console.log(validity);
    if (!validity)
      res.status(400).json({ message: "Invalid credentials", success: false });
    const token = jwt.sign({ id: user._id }, "secretkey");
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ user, token, success: true });
  } catch (err) {
    //res.status(409).json({ message: err.message, success: false });
    console.log(err);
  }
};
export const Googlefun = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //if user already exists
      const token = jwt.sign({ id: user._id }, "secretkey");
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ user, token, success: true });
    } else {
      const newpwd = Math.random().toString(36).slice(-8); //if user doesn't exist
      const hashedpwd = await bcryptjs.hash(newpwd, 10);
      const newUser = new User({
        username: req.body.name,
        email: req.body.email,
        password: hashedpwd,
      });
      await newUser.save();
      const token = jwt.sign({ id: user._id }, "secretkey");
      res
        .cookie("token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({ user, token, success: true });
    }
  } catch (err) {
    res.status(409).json({ message: err.message, success: false });
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    console.log(req.user.password);
    res.status(200).json("Logged out");
  } catch (err) {
    res.status(409).json({ message: err.message, success: false });
  }
};
