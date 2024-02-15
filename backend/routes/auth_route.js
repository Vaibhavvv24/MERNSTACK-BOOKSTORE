import express from "express";
import { Signup, Login, Googlefun } from "../controllers/authcont.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/google", Googlefun);

export default router;
