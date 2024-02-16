import React from "react";

const Rating = ({ rating }) => {
  if (rating < 1) return <p>Not rated</p>;
  if (rating >= 1 && rating < 1.5) return <p>⭐️</p>;
  if (rating >= 1.5 && rating < 2.5) return <p>⭐️⭐️</p>;
  if (rating >= 2.5 && rating < 3.5) return <p>⭐️⭐️⭐️</p>;
  if (rating >= 3.5 && rating < 4.5) return <p>⭐️⭐️⭐️⭐️</p>;
  if (rating >= 4.5) return <p>⭐️⭐️⭐️⭐️⭐️</p>;
};

export default Rating;
