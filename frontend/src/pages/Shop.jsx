import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getBooks = async function () {
      const response = await fetch("/api/books/getAll");
      const data = await response.json();
      setBooks(data);
      setLoading(false);
    };

    getBooks();
  }, []);

  return (
    <div className="">
      {loading && <h1>Loading...</h1>}
      <h1>Welcome to Bookstore.com</h1>
      <div className="flex flex-wrap justify-between items-between gap-8">
        {books.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
