import React, { useEffect, useState } from "react";
import Book from "../components/Book";
import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/Cart";

const Shop = () => {
  const { books, loading } = UseCart();

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
