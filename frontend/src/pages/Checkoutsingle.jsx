import React from "react";
import { useParams } from "react-router-dom";
import { UseBooks } from "../context/BookC";
import { useState } from "react";

const Checkoutsingle = () => {
  const book = localStorage.getItem("book")
    ? JSON.parse(localStorage.getItem("book"))
    : null;
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const [phone, setPhone] = useState("");

  const payNow = async () => {
    if (phone === "") return alert("Please enter your phone number");
    const res = await fetch("/api/getAPIKEY");
    const apiKey = await res.json();
    const API_KEY = apiKey.KEY;

    console.log(API_KEY);
    const amount = book.salePrice + book.salePrice * 0.1;
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
        contact: phone, //Provide the customer's phone number for better conversion rates
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
    <div className="flex m-3">
      <div className="w-1/3">
        <img src={book.image} alt={book.title} className="w-96 h-96" />{" "}
      </div>
      <div className="w-1/3 flex flex-col gap-4">
        <h1 className="font-bold text-3xl">{book.title}</h1>
        <h1 className="font-bold text-xl">By: {book.author}</h1>
        <h1 className="font-bold text-xl">Our Price: {book.salePrice}</h1>
        <h1 className="text-red-500 line-through">MRP: {book.regularPrice}</h1>

        <h1 className="text-clip overflow-hidden ...">{book.description}</h1>
      </div>
      <div className="w-1/3">
        <form className="flex flex-col gap-5 mt-5">
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
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
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
          Pay
        </button>
      </div>
    </div>
  );
};

export default Checkoutsingle;
