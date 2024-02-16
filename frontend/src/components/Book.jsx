import React from "react";
import { useNavigate } from "react-router-dom";

const Book = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-center items-center shadow-md border border-blue-300"
      onClick={() => navigate(`/shop/book/${book._id}`)}
    >
      <h1 className="text-3xl">{book.title}</h1>
      <img
        src="harry.jpg"
        alt={book.title}
        className="cover w-48 h-64 mx-20 mb-10 mt-10"
      />
      {/* <p>{book.description}</p> */}
      <p className="text-xl pt-2">Price: ${book.price}</p>
      <p className="text-xl pt-2">Genre: {book.category}</p>
    </div>
  );
};

export default Book;
