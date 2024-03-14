import { createContext, useState, useEffect, useContext } from "react";

const BookContext = createContext();

function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return (
    <BookContext.Provider value={{ books, getBooks, loading }}>
      {children}
    </BookContext.Provider>
  );
}

function UseBooks() {
  return useContext(BookContext);
}
export { BookProvider, UseBooks };
