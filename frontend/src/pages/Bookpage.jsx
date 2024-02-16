import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Bookpage = () => {
  const params = useParams();
  const { id } = params;
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getBook = async function () {
      try {
        setLoading(true);
        const res = await fetch(`/api/books/get/${id}`);
        const data = await res.json();
        setBook(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    getBook();
  }, [id]);

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      <h1>Individual book</h1>
      <h1>{book.title}</h1>
      <img src="harry.jpg" alt={book.title} />
      <p>{book.description}</p>
      <p>{book.price}</p>
      <p>{book.category}</p>
    </div>
  );
};

export default Bookpage;
