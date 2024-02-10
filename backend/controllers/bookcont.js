import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(201).json(books);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const addBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
