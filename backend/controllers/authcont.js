import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedpwd = await bcryptjs.hash(password, 10);
    const newUser = new User({ name, email, password: hashedpwd });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) res.status(404).json({ message: "User not found" });
    const validity = await bcryptjs.compare(password, user.password);
    if (!validity) res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, "secretkey");
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(validemailuser);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
