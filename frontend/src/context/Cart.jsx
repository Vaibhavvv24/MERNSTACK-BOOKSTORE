import { createContext, useContext, useEffect, useState } from "react";

const Cartcontext = createContext();

const CartProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({
    itemid: 0,
    quantity: 0,
  });

  const getBooks = async function () {
    try {
      setLoading(true);
      const response = await fetch("/api/books/getAll");
      const data = await response.json();
      console.log(data);
      setBooks(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getBooks();
  }, []);
  const [cart, setCart] = useState({
    items: [],
    total: 0,
  });

  function addItem(id) {
    //books.find((item) => {});
    books.find((item) => {
      if (item._id === id) {
        setCart({
          ...cart,
          items: [...cart.items, item],
          total: cart.total + item.salePrice,
        });
        setQuantities({
          ...quantities,
          itemid: item._id,
          quantity: quantities.quantity + 1,
        });
      }
    });
  }
  function removeItem(id) {
    books.find((item) => {
      if (item._id === id) {
        setCart({
          ...cart,
          total: cart.total - item.salePrice,
          items: cart.items.filter((item) => item._id !== id),
        });
        setQuantities({
          ...quantities,
          quantity: quantities.quantity - 1,
          itemid: 0,
        });
      }
    });
  }
  function clearCart() {
    setCart({ ...cart, items: [], total: 0 });
    setQuantities({ ...quantities, quantity: 0, itemid: 0 });
  }
  function getTotal() {
    return cart.total;
  }

  return (
    <Cartcontext.Provider
      value={{
        cart,
        setCart,
        addItem,
        removeItem,
        clearCart,
        getTotal,
        books,
        setBooks,
        loading,
        setLoading,
        quantities,
        setQuantities,
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
