import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const query = useSearchParams()[0];
  console.log(query);
  const Navigate = useNavigate();
  const refid = query.get("reference");
  return (
    <div className="flex flex-col justify-center items-center mt-[200px] gap-4">
      <h1 className="text-3xl font-bold">Payment Success</h1>
      <h1 className="text-xl font-semibold">Reference id: {refid}</h1>
      <h1 className="text-xl ">Thank you for shopping with us</h1>
      <button
        onClick={() => Navigate("/")}
        className="bg-blue-200 p-3 rounded-md "
      >
        Go back to home page
      </button>
    </div>
  );
};

export default PaymentSuccess;
