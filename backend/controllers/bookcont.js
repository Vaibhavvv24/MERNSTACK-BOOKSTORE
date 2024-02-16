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
export const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.status(201).json(book);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404).json("Book not found");
  }
  if (book.admin !== req.body.id) {
    res.status(401).json("You can update only your book");
  }
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(updatedBook);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book.admin !== req.body.id) {
    res.status(401).json("You can delete only your book");
  }
  if (!book) {
    res.status(404).json("Book not found");
  }
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(201).json("Book has been deleted");
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
