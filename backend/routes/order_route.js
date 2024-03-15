import express from "express";
import { getOrder } from "../controllers/ordercont.js";
const router = express.Router();

router.get("/get/:id", getOrder);

export default router;
