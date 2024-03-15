import React from "react";
import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/Cart";

//import Razorpay from "razorpay";
const Checkout = () => {
  const navigate = useNavigate();
  //const { cart, getTotal } = UseCart();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const { userCart } = UseCart();

  const payNow = async () => {
    const res = await fetch("/api/getAPIKEY");
    const apiKey = await res.json();
    const API_KEY = apiKey.KEY;

    console.log(API_KEY);
    const amount = userCart.cart.amount + userCart.cart.amount * 0.1;
    console.log(userCart.cart.products);
    const response = await fetch("/api/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        userId: currentUser._id,
        products: userCart.cart.products,
      }),
    });
    const data = await response.json();
    localStorage.setItem("order", JSON.stringify(data));
    console.log(data);
    const options = {
      key: API_KEY, // Enter the Key ID generated from the Dashboard
      amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Vaibhav Book Store", //your business name
      description: "Bookstore Test Transaction",
      image:
        "https://media.licdn.com/dms/image/D4D03AQEDBsQEqPRLtQ/profile-displayphoto-shrink_800_800/0/1663310624366?e=2147483647&v=beta&t=veYdmF3dhUYu5aMaoeRk0f-g4M03zA00Wt_BGUbbZhM",
      order_id: data.id,
      callback_url: "/api/payment/checkout/verification",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: currentUser.username, //your customer's name
        email: currentUser.email,
        contact: "9871578822", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);

    rzp.open();
  };

  return (
    <div className="flex flex-col m-4">
      <h1 className="text-3xl text-center">Checkout</h1>

      <h1 className="text-2xl text-center mt-3">
        Here is your Order Summary {currentUser.username}
      </h1>
      <div className="flex mt-12 gap-10 ">
        <div className="flex flex-col gap-10 w-1/2 bg-pink-600 p-5 rounded-md">
          {userCart.cart.products.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-center gap-4 items-center bg-red-100 rounded-md"
            >
              <p>Book: {item.title}</p>

              <p>Price: ₹{item.salePrice}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 bg-blue-400 p-6 rounded-md">
          <h1 className="text-2xl">
            Total Amount:₹{userCart.cart.amount * 0.1 + userCart.cart.amount}
          </h1>
          <h2 className="text-xl mt-2">Enter your Details</h2>

          <form className="flex flex-col gap-5 mt-5 w-3/4">
            <input
              type="text"
              placeholder="Name"
              defaultValue={currentUser.username}
              className="p-3 border-solid rounded-md w-full shadow-md"
            />
            <input
              type="text"
              placeholder="Email"
              defaultValue={currentUser.email}
              className="p-3 border-solid rounded-md w-full shadow-md"
            />
            <input
              type="phone"
              placeholder="Phone"
              className="p-3 border-solid rounded-md w-full shadow-md"
            />
            <input
              type="text"
              placeholder="City"
              className="p-3 border-solid rounded-md w-full shadow-md"
            />
            <input
              type="text"
              placeholder="State"
              className="p-3 border-solid rounded-md w-full shadow-md"
            />
            <input
              type="text"
              placeholder="Zipcode"
              className="p-3 border-solid rounded-md w-full shadow-md"
            />
            <input
              type="text"
              placeholder="Address"
              className="p-3 border-solid rounded-md w-full shadow-md"
            />
          </form>
          <button
            onClick={payNow}
            className="bg-green-300 p-4 rounded-md mt-4 w-1/2 text-white"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
