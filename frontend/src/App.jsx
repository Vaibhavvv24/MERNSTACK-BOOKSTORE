import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sell from "../../frontend/src/pages/Sell";
import Home from "../../frontend/src/pages/Home";
import About from "../../frontend/src/pages/About";
import Shop from "../../frontend/src/pages/Shop";
import Contact from "../../frontend/src/pages/Contact";
import Blog from "../../frontend/src/pages/Blog";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/about" element={<About />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
