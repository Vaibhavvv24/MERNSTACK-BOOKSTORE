import React, { useState } from "react";
import axios from "axios";
import { UseAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    regularPrice: 0,
    salePrice: 0,
    category: "",
    image: "",
    description: "",
    reviews: 0,
    rating: 0,
    publisher: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postImage, setPostImage] = useState({ myFile: "" });
  const { user } = UseAuth();
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const Navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      setLoading(true);
      const res = await fetch("/api/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          image: postImage.myFile,
          admin: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      setError(null);
      console.log(data);
      Navigate("/shop");
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };
  const handleFile = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    console.log(base64);
    setPostImage({ ...postImage, myFile: base64 });
  };
  return (
    <div>
      <h1 className="text-3xl text-center mt-10">
        Sell your book here {currentUser.username}
      </h1>
      <div className="flex justify-center items-center mt-5">
        <form className="flex flex-col w-1/2 gap-4" onSubmit={handleSubmit}>
          <div className="flex gap-6">
            <label htmlFor="title" className="">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Title"
              onChange={handleChange}
              required
              value={formData.title}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex gap-6">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              placeholder="Author"
              onChange={handleChange}
              required
              value={formData.author}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex gap-6">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              id="publisher"
              placeholder="Publisher"
              onChange={handleChange}
              required
              value={formData.publisher}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex gap-6">
            <label htmlFor="regularPrice">MRP</label>

            <input
              type="number"
              id="regularPrice"
              placeholder="MRP"
              onChange={handleChange}
              required
              value={formData.regularPrice}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex">
            <label htmlFor="salePrice">Sale Price</label>
            <input
              type="number"
              id="salePrice"
              placeholder="Sale Price"
              onChange={handleChange}
              required
              value={formData.salePrice}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              placeholder="Category"
              onChange={handleChange}
              required
              value={formData.category}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex">
            <label htmlFor="reviews">Number of reviews</label>
            <input
              type="number"
              id="reviews"
              placeholder="Number of reviews"
              onChange={handleChange}
              required
              value={formData.reviews}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex">
            <label htmlFor="rating">Rating out of 5</label>
            <input
              type="number"
              id="rating"
              step={"0.1"}
              placeholder="Rating out of 5"
              onChange={handleChange}
              required
              value={formData.rating}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex gap-5 ">
            <label htmlFor="image">Image</label>

            <input
              type="file"
              id="file-upload"
              onChange={(e) => handleFile(e)}
              name="myFile"
              required
              //value={formData.image}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <div className="flex gap-3">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="4"
              cols={"50"}
              placeholder="Description"
              onChange={handleChange}
              value={formData.description}
              className="p-2 shadow-md border-solid rounded-md w-full"
            />
          </div>
          <button type="submit" className="bg-green-100 p-3 rounded-md">
            Add book for sale
          </button>
          {loading && <p>Loading...</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Sell;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
