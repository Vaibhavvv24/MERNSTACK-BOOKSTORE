import express from "express";
import { verify } from "../utils/verify.js";
import {
  getCart,
  addToCart,
  deleteCart,
  updateCart,
} from "../controllers/cartcont.js";

const router = express.Router();

router.get("/get/:id", verify, getCart);
router.post("/add/:id", verify, addToCart);
router.delete("/delete/:id", verify, deleteCart);
router.put("/update/:id", verify, updateCart);

export default router;
