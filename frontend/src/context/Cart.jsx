import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Cartcontext = createContext();

const CartProvider = ({ children }) => {
  const [message, setMessage] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("user"));
  //const [loading, setLoading] = useState(false);

  const [userCart, setUserCart] = useState({});
  const { id } = useParams();

  async function getCart() {
    try {
      setMessage("");
      const res = await fetch(`/api/cart/get/${currentUser._id}`);
      const data = await res.json();
      //console.log(data.cart.products);

      setUserCart(data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getCart();
  }, [id]);

  async function clearCart() {
    //setCart({ ...cart, items: [], total: 0 });
    setUserCart({ ...userCart, cart: { products: [], amount: 0 } });

    const res = await fetch(`/api/cart/delete/${currentUser._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    alert(data.message);
    setMessage(data.message);

    console.log(userCart);
    console.log(data);
  }
  return (
    <Cartcontext.Provider
      value={{
        message,
        setMessage,
        userCart,
        setUserCart,
        clearCart,
        getCart,
      }}
    >
      {children}
    </Cartcontext.Provider>
  );
};

function UseCart() {
  return useContext(Cartcontext);
}
export { CartProvider, UseCart };
