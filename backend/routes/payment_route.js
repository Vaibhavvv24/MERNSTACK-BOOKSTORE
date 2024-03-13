import express from "express";
import { Checkout, Payverify } from "../controllers/paymentcont.js";

const router = express.Router();

router.post("/payment/checkout", Checkout);
router.post("/payment/checkout/verification", Payverify);

export default router;
