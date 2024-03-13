import mongoose from "mongoose";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  resetPasswordtoken: String,
  resetPasswordExpire: String,
});

const User = mongoose.model("User", userSchema);
userSchema.methods.generateToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordtoken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
export default User;
