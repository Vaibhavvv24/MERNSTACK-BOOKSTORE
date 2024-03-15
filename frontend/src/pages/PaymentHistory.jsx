import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentHistory = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  if (!currentUser) {
    navigate("/login");
  }
  const order = JSON.parse(localStorage.getItem("order"));

  return (
    <div>
      <h1>PaymentHistory</h1>
      <h1>hello {currentUser.username}, Here is your order history </h1>

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default PaymentHistory;
