import express from "express";
import Book from "../models/Book.js";
import mongoose from "mongoose";
import { getBooks, addBook } from "../controllers/bookcont.js";
import { verify } from "../utils/verify.js";
const router = express.Router();

router.get("/getAll", getBooks);

router.post("/add", verify, addBook);
// router.put("/update/:id", updateBook);
// router.delete("/delete/:id", deleteBook);

export default router;
