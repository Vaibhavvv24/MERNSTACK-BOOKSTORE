import express from "express";
import { verify } from "../utils/verify.js";
import { getCart, addToCart, deleteCart } from "../controllers/cartcont.js";

const router = express.Router();

router.get("/get/:id", verify, getCart);
router.post("/add/:id", verify, addToCart);
router.delete("/delete/:id", verify, deleteCart);

export default router;
