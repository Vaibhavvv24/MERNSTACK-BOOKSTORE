import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/Cart";
import CartItem from "../components/CartItem";
import Empty from "../assets/empty.png";

const Cartpage = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const { userCart, message, clearCart } = UseCart();
  console.log(userCart);

  //const [loading, setLoading] = useState(false);

  if (!currentUser) {
    return (
      <div className="flex flex-col justify-center gap-10 items-center">
        <div>You can buy books only if you are logged in</div>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }
  if (
    userCart?.cart?.products?.length === 0 ||
    message === "Cart has been deleted" ||
    userCart.cart === null
  ) {
    return (
      <div className="flex flex-col justify-center gap-5 items-center">
        <div className="text-3xl text-center mt-4">Cart is empty</div>
        <img src={Empty} alt="emptycart" className="w-1/3 h-1/3" />
        <button
          onClick={() => navigate("/shop")}
          className="p-4 bg-orange-300 rounded-md"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-10 items-center">
      {/* {loading && <h1>Loading...</h1>} */}
      <h1 className="mt-4 text-3xl font-bold"> hello {currentUser.username}</h1>
      <p className="text-2xl">
        {userCart?.cart?.products?.length === 0
          ? "Cart is empty"
          : `You have ${userCart?.cart?.products?.length} books in your cart`}
      </p>

      <div className="flex  ">
        {/* <div className="flex flex-col">
          {cart.items?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div> */}
        <div className="flex flex-col">
          {userCart?.cart?.products?.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        <div className="flex flex-col justify-center items-center gap-4 m-2 bg-blue-200 w-[300px] h-[300px] rounded-md">
          <h1 className="text-2xl text-red-500">
            Total: ₹{userCart?.cart?.amount}
          </h1>
          <p className="text-xl text-red-400">
            Delivery charges: ₹{userCart?.cart?.amount * 0.1}
          </p>
          <p className="text-xl text-red-700 ">
            Grand Total: ₹
            {userCart?.cart?.amount + userCart?.cart?.amount * 0.1}
          </p>
          <button onClick={clearCart} className="p-2 bg-orange-300 rounded-md">
            Clear Cart
          </button>
          <button
            onClick={() => navigate(`/shop/book/checkout`)}
            className="p-3 bg-orange-300 rounded-md"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
