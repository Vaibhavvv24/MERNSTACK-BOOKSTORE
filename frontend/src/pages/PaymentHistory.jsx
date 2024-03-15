import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const dateTime = (myUnixTimestamp) => {
  const myDate = new Date(myUnixTimestamp * 1000); // convert timestamp to milliseconds and construct Date object

  console.log(myDate);
  console.log(myDate.toDateString()); // will print "Thu Aug 10 2023"
  return myDate.toDateString();
};
const PaymentHistory = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [orders, setOrders] = useState({});
  if (!currentUser) {
    navigate("/login");
  }

  async function getOrders() {
    const res = await fetch(`/api/orders/get/${currentUser._id}`);
    const data = await res.json();
    console.log(data);
    if (data.message === "Order not found") {
      setOrders({ orders: ["Order not found"] });
      return;
    }
    setOrders(data);
  }
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">Order History</h1>
      <h1 className="text-2xl font-semibold text-center mt-3">
        Hello {currentUser.username}, here is your order history{" "}
      </h1>
      {/* <div className="flex flex-col gap-10 m-5 p-5 rounded-md"> */}
      {orders.orders?.map((order) => (
        <>
          <div className="flex flex-col gap-10 bg-orange-300 m-5 p-5 rounded-md">
            <div className="flex my-6 gap-4 bg-blue-400 p-4">
              <h1 className="text-xl font-bold">
                Order Total: ₹{order.amount}(including delivery charges)
              </h1>
              <h1 className="text-xl font-bold">
                Order Date: {dateTime(order.createdAt)}
              </h1>
            </div>
            <div className="flex flex-col gap-10">
              {order.products.map((product) => (
                <div className="flex   " key={product._id}>
                  <div className="w-1/3">
                    <img
                      src={product.image}
                      alt="product"
                      className="w-[300px] h-[150px] rounded-md "
                    />
                  </div>
                  <div className="flex flex-col mx-10 w-1/3 gap-4">
                    <p className="text-xl font-medium">{product.title}</p>

                    <p className="text-xl font-medium">
                      Our Price: ₹{product.salePrice}
                    </p>
                    <button
                      className="p-2 bg-red-200 rounded-md text-lg font-semibold"
                      onClick={() =>
                        navigate(`/shop/book/${product.productId}`)
                      }
                    >
                      Buy again
                    </button>
                  </div>
                  <div className="flex w-1/3 items-center justify-center">
                    {" "}
                    <button
                      className="px-10 py-5 bg-red-200 rounded-md text-lg font-semibold"
                      onClick={() => navigate(`/review/${product._id}`)}
                    >
                      Write a review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ))}
      {/* </div> */}

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default PaymentHistory;
