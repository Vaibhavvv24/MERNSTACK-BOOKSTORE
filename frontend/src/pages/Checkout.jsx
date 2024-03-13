import React from "react";
import { useNavigate } from "react-router-dom";
import { UseCart } from "../context/Cart";

//import Razorpay from "razorpay";
const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotal } = UseCart();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const payNow = async () => {
    const res = await fetch("/api/getAPIKEY");
    const apiKey = await res.json();
    const API_KEY = apiKey.KEY;

    console.log(API_KEY);
    const amount = getTotal();
    const response = await fetch("/api/payment/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
      }),
    });
    const data = await response.json();
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
    <div className="flex flex-col justify-center items-center">
      <h1>Checkout</h1>

      <h1>Here is your Order Summary {currentUser.username}</h1>
      <div className="flex mt-20 gap-10 ">
        <div className="flex flex-col gap-10">
          {cart.items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col justify-center gap-4 items-center bg-red-100 rounded-md"
            >
              <p>Book:{item.title}</p>
              <p>By:{item.author}</p>
              <p>Price:{item.salePrice}</p>
              <p>Published:{item.publisher}</p>
            </div>
          ))}
        </div>
        <div>
          <h1>Total Amount:{getTotal()}</h1>
          <form className="flex flex-col gap-4 mt-10">
            <input
              type="text"
              placeholder="Name"
              defaultValue={currentUser.username}
            />
            <input
              type="text"
              placeholder="Email"
              defaultValue={currentUser.email}
            />
            <input type="phone" placeholder="Phone" />
            <input 
          </form>
          <button
            onClick={payNow}
            className="bg-green-300 p-4 rounded-md text-white"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
