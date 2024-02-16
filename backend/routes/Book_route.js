import express from "express";
import Book from "../models/Book.js";
import mongoose from "mongoose";
import {
  getBooks,
  addBook,
  deleteBook,
  updateBook,
  getBook,
} from "../controllers/bookcont.js";
import { verify } from "../utils/verify.js";
const router = express.Router();

router.post("/create", verify, addBook);
router.delete("/delete/:id", verify, deleteBook);
router.post("/update/:id", verify, updateBook);
router.get("/get/:id", getBook);
router.get("/getAll", getBooks);

// router.put("/update/:id", updateBook);
// router.delete("/delete/:id", deleteBook);

export default router;
