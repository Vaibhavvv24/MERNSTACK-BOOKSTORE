import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { UseCart } from "../context/Cart";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineMinusCircle } from "react-icons/ai";
const CartItem = ({ item }) => {
  const { removeItem, quantities, setQuantities } = UseCart();
  const [quantity, setQuantity] = useState(1);

  const handleRemove = () => {
    removeItem(item._id);
  };
  const handleDec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      item.quantity = 10 - quantity;
      setQuantities({
        ...quantities,
        quantity: quantity - 1,
        itemid: item._id,
      });
    }
  };
  const handleInc = () => {
    setQuantity(quantity + 1);
    item.quantity = 10 - quantity;
    setQuantities({ ...quantities, quantity: quantity + 1, itemid: item._id });
  };

  return (
    <div key={item._id} className="flex  m-5 bg-pink-300 p-4 w-[700px]">
      <img src={item.image} alt={item.title} className="w-48 h-48" />
      <div className="flex flex-col px-4 pt-3">
        <h1 className="text-2xl font-bold">{item.title}</h1>
        <h2 className="text-xl font-semibold">
          Our Price: {item.salePrice * quantity}
        </h2>
        <h2 className="text-xl font-semibold">
          MRP: {item.regularPrice * quantity}
        </h2>
        <p>You save:{(item.regularPrice - item.salePrice) * quantity}</p>

        {/* <p className="text-lg truncate">{item.description.substring(0, 100)}</p> */}
        <div className="flex justify-between">
          {/* <div className="flex gap-2 mt-5">
            <AiOutlineMinusCircle
              size={25}
              onClick={handleDec}
              disabled={quantity === 1}
            />
            <p className="text-xl font-medium"> {quantity} </p>

            <AiOutlinePlusCircle
              size={25}
              onClick={handleInc}
              disabled={quantity === 1}
            />
          </div> */}
          <button onClick={handleRemove}>
            <MdDelete size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
