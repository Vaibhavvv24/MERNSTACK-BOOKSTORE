import React from "react";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import Harry from "../assets/harry.jpg";

const Book = ({ book }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col justify-center items-center shadow-md border border-blue-300"
      onClick={() => navigate(`/shop/book/${book._id}`)}
    >
      <h1 className="text-2xl">{book.title}</h1>
      <img
        src={book.image}
        alt={book.title}
        className="cover w-48 h-64 mx-20 mb-10 mt-10"
      />
      <Rating rating={book.rating} />

      {/* <p>{book.description}</p> */}
      <p className="text-xl pt-2">MRP: ₹{book.regularPrice}</p>
      <p className="text-xl pt-2">Our Price: ₹{book.salePrice}</p>
      <p className="text-xl pt-2">Genre: {book.category}</p>
    </div>
  );
};

export default Book;
