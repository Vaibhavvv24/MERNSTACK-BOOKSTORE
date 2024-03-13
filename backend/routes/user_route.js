import express from "express";
import { verify } from "../utils/verify.js";
import {
  deleteUser,
  getUser,
  getUserBooks,
  updateUser,
  Forgot,
  Reset
} from "../controllers/usercont.js";

const router = express.Router();
router.post("/update/:id", verify, updateUser);
router.delete("/delete/:id", verify, deleteUser);
router.get("/books/:id", verify, getUserBooks);
router.post("/forgotpwd", Forgot);
router.post("/resetpwd/:token",Reset);
router.get("/:id", verify, getUser);
export default router;
