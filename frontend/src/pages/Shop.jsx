import React, { useEffect, useState } from "react";
import Book from "../components/Book";

import { UseBooks } from "../context/BookC";

const Shop = () => {
  const { books, loading } = UseBooks();

  return (
    <div className="">
      {loading && <h1>Loading...</h1>}
      <h1>Welcome to Bookstore.com</h1>
      <div className="flex flex-wrap justify-between items-between gap-8">
        {books?.map((book) => (
          <Book key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
