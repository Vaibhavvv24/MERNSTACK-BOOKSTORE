import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sell from "../../frontend/src/pages/Sell";
import Home from "../../frontend/src/pages/Home";
import Profile from "../../frontend/src/pages/Profile";
import Shop from "../../frontend/src/pages/Shop";
import Contact from "../../frontend/src/pages/Contact";
import Blog from "../../frontend/src/pages/Blog";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Bookpage from "./pages/Bookpage";
import { AuthProvider } from "./context/Auth";
import Private from "./components/Private";
import { CartProvider } from "./context/Cart";
import Cartpage from "./pages/Cartpage";
import Checkout from "./pages/Checkout";
import Checkoutsingle from "./pages/Checkoutsingle";
import PaymentSuccess from "./pages/PaymentSuccess";
import Forgot from "./pages/Forgot";
import ResetPass from "./pages/ResetPass";
import { BookProvider } from "./context/BookC";
import PaymentHistory from "./pages/PaymentHistory";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <BookProvider>
            <CartProvider>
              <Navbar />
              <Routes>
                <Route path="/" index element={<Home />} />
                <Route element={<Private />}>
                  <Route path="/sell" element={<Sell />} />
                  <Route path="/profile/:id" element={<Profile />} />
                  <Route path="/cart/:id" element={<Cartpage />} />
                  <Route path="/orders/:id" element={<PaymentHistory />} />
                </Route>
                <Route path="/shop" element={<Shop />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop/book/checkout" element={<Checkout />} />
                <Route
                  path="/shop/book/checkout/:id"
                  element={<Checkoutsingle />}
                />
                `
                <Route path="/blog" element={<Blog />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/shop/book/:id" element={<Bookpage />} />
                <Route path="/paymentsuccess" element={<PaymentSuccess />} />
                <Route path="/reset/:token" element={<ResetPass />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </CartProvider>
          </BookProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
