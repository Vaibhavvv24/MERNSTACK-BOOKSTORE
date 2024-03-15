import Order from "../models/Order.js";
import mongoose from "mongoose";

export const getOrder = async (req, res) => {
  try {
    const orders = await Order.findOne({ userId: req.params.id });
    if (!orders) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
