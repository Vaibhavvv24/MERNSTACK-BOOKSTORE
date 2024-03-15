import express from "express";
import { verify } from "../utils/verify.js";
import {
  getCart,
  addToCart,
  deleteCart,
  updateCart,
} from "../controllers/cartcont.js";

const router = express.Router();

router.get("/get/:id", getCart);
router.post("/add/:id", addToCart);
router.delete("/delete/:id", deleteCart);
router.put("/update/:id", updateCart);

export default router;
