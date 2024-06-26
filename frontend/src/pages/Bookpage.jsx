import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UseCart } from "../context/Cart";

const Bookpage = () => {
  const params = useParams();
  const { id } = params;
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const { setMessage } = UseCart();

  const navigate = useNavigate();

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
  const discount = book.regularPrice - book.salePrice;

  async function addItems() {
    setMessage("");
    alert("Item added to cart");
    if (!currentUser) {
      navigate("/login");
    }
    const res = await fetch(`/api/cart/add/${currentUser._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: currentUser._id,
        products: [
          {
            salePrice: book.salePrice,
            regularPrice: book.regularPrice,
            image: book.image,
            title: book.title,
            productId: book._id,
          },
        ],
        amount: book.salePrice,
      }),
    });
    const data = await res.json();
    console.log(data);
  }
  const handleBuy = () => {
    navigate(`/shop/book/checkout/${book._id}`);
    localStorage.setItem("book", JSON.stringify(book));
  };
  return (
    <div className="flex">
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error.message}</h1>}
      <div className="w-1/4">
        <img
          src={book.image}
          alt={book.title}
          className="cover w-48 h-64 mx-20 mb-10 mt-10"
        />
      </div>
      <div className="flex flex-col w-1/2">
        <h1 className="text-2xl text-red-500 mt-10">{book.title}</h1>
        <div className="flex gap-2 ">
          <p className="text-xl">By: {book.author} (Author)</p> |
          <p className="text-xl"> Publisher: {book.publisher} </p>
        </div>
        <div className="flex gap-2">
          <p className="text-xl">Rating: {book.rating}/5</p>|
          <p className="text-xl">Reviews: {book.reviews}</p>
        </div>
        <p className="text-red-500 text-xl">₹{book.salePrice}</p>
        <p className="text-xl line-through ">MRP: ₹{book.regularPrice}</p>
        <p className="text-xl font-semibold">
          Save: ₹{discount}({((discount / book.regularPrice) * 100).toFixed(2)}
          %)
        </p>

        <p className="text-xl font-semibold">Genre: {book.category}</p>
        <p className="text-xl whitespace-normal">{book.description}</p>
      </div>
      <div className="w-1/4 flex mt-10 ">
        <div className="flex flex-col items-center gap-4 w-[85%] h-2/3 border border-4 rounded-md border-slate-300">
          <button
            className="bg-green-400 p-2 rounded-lg w-[90%] text-white "
            onClick={() => addItems()}
          >
            Add to Cart
          </button>
          <button
            className="bg-orange-300 p-2 rounded-lg w-[90%] text-white "
            onClick={handleBuy}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bookpage;
