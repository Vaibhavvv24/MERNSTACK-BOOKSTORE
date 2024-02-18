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

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route element={<Private />}>
              <Route path="/sell" element={<Sell />} />
              <Route path="/profile/:id" element={<Profile />} />
            </Route>
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            <Route path="/shop/book/:id" element={<Bookpage />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
