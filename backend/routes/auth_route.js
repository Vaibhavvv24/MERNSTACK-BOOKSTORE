import express from "express";
import { Signup, Login } from "../controllers/authcont.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
