import Razorpay from "razorpay";
import { config } from "dotenv";
config({ path: "./config.env" });

export const instance = new Razorpay({
  key_id: process.env.RAZOR_KEY,
  key_secret: process.env.SECRET_RAZOR,
});
