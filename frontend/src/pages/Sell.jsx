import React, { useState } from "react";

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
          admin: "65ce0086bae19a087c18fc05",
        }),
      });
      const data = await res.json();
      setLoading(false);
      setError(null);
      console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-3xl text-center mt-10">Sell your book</h1>
      <div className="flex justify-center items-center mt-5">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            placeholder="Title"
            onChange={handleChange}
            required
            value={formData.title}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
          <input
            type="text"
            id="author"
            placeholder="Author"
            onChange={handleChange}
            required
            value={formData.author}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
          <input
            type="text"
            id="publisher"
            placeholder="Publisher"
            onChange={handleChange}
            required
            value={formData.publisher}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
          <input
            type="number"
            id="regularPrice"
            placeholder="MRP"
            onChange={handleChange}
            required
            value={formData.regularPrice}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
          <input
            type="number"
            id="salePrice"
            placeholder="Sale Price"
            onChange={handleChange}
            required
            value={formData.salePrice}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
          <input
            type="text"
            id="category"
            placeholder="Category"
            onChange={handleChange}
            required
            value={formData.category}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
          <input
            type="number"
            id="reviews"
            placeholder="Number of reviews"
            onChange={handleChange}
            required
            value={formData.reviews}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
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

          <input
            type="file"
            id="image"
            onChange={handleChange}
            required
            value={formData.image}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
          <textarea
            id="description"
            rows="4"
            cols={"50"}
            placeholder="Description"
            onChange={handleChange}
            value={formData.description}
            className="p-2 shadow-md border-solid rounded-md w-full"
          />
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
