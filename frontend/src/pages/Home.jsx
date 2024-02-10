import React from "react";
import ReactCardSlider from "react-card-slider-component";
import { useNavigate } from "react-router-dom";
import Slider from "../components/Slider";

const slides = [
  {
    image: "book1.png",
    title: "Book 1",
    description: "Description 1",
  },
  {
    image: "book1.png",
    title: "Book 1",
    description: "Description 1",
  },
  {
    image: "book1.png",
    title: "Book 1",
    description: "Description 1",
  },
  {
    image: "book1.png",
    title: "Book 1",
    description: "Description 1",
  },
  {
    image: "book1.png",
    title: "Book 1",
    description: "Description 1",
  },
  {
    image: "book1.png",
    title: "Book 1",
    description: "Description 1",
  },
];
const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="bg-blue-200 flex gap-20 pt-20 px-10">
        <div className="w-1/2">
          <h1 className="text-5xl">Buy and sell your books</h1>
          <h1 className="text-blue-500 text-5xl">for the best prices</h1>
          <p className="text-xl mt-6">
            Welcome to our literary haven, where every page holds a new
            adventure and every cover whispers a story waiting to be explored.
            Dive into a world of endless imagination and discovery at our book
            store.
          </p>
        </div>
        <div className="w-1/2">
          <img src="book1.png" alt="book" className="w-48 h-64 mx-20 mb-16" />
        </div>
      </div>
      <div className="flex">
        <div className="w-1/2 mx-10 my-10">
          <img src="homecover.jpg" alt="cover" className="w-96 h-96" />
        </div>
        <div className="w-1/2 pt-36">
          <h1 className="text-5xl">Find your favourite</h1>
          <h1 className="text-blue-500 text-5xl">Book here!!</h1>
          <button
            onClick={() => navigate("/shop")}
            className="bg-blue-200 p-3 rounded-md mt-10"
          >
            Explore Now
          </button>
        </div>
      </div>
      <div className="mt-20">
        <h1 className="text-3xl text-center">
          What people have to say about our books
        </h1>
        <Slider />
      </div>
    </div>
  );
};

export default Home;
