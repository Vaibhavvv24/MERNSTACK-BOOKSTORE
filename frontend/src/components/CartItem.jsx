import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

const CartItem = ({ item }) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const handleRemove = async () => {
    alert(`${item.title} is removed from cart`);
    const res = await fetch(`/api/cart/update/${currentUser._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: item.productId,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <div key={item._id} className="flex  m-5 bg-pink-300 p-4 w-[700px]">
      <img src={item.image} alt={item.title} className="w-48 h-48" />
      <div className="flex flex-col px-4 pt-3">
        <h1 className="text-2xl font-bold">{item.title}</h1>
        <h2 className="text-xl font-semibold">Our Price: {item.salePrice}</h2>
        <h2 className="text-xl font-semibold">MRP: {item.regularPrice}</h2>
        <p>You save:{item.regularPrice - item.salePrice}</p>

        {/* <p className="text-lg truncate">{item.description.substring(0, 100)}</p> */}
        <div className="flex justify-between">
          <button onClick={handleRemove}>
            <MdDelete size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
