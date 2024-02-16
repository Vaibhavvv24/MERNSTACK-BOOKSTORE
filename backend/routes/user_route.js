import express from "express";
import { verify } from "../utils/verify.js";
import {
  deleteUser,
  getUser,
  getUserBooks,
  updateUser,
} from "../controllers/usercont.js";

const router = express.Router();
router.post("/update/:id", verify, updateUser);
router.delete("/delete/:id", verify, deleteUser);
router.get("/listings/:id", verify, getUserBooks);
router.get("/:id", verify, getUser);
export default router;
