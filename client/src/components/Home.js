import React, { useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = ({ products }) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const navigate = useNavigate(); // Assuming you are using react-router-dom for navigation

  const handleAddReview = async (e) => {
    e.preventDefault();

    try {
      const newReview = {
        review: review,
        rating: parseInt(rating)
      };

      const response = await fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newReview)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Review submitted successfully:", data);
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again later.");
    }
  };

  const handleDelete = (id) => {
    fetch(`/reviews/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Review deleted successfully");
          // You can add additional logic here after successful deletion if needed
        } else {
          throw new Error("Failed to delete review");
        }
      })
      .catch((error) => {
        console.error("Error deleting review:", error);
        alert("Failed to delete review. Please try again later.");
      });
  };

  return (
    <div className="items">
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.name}</h1>
          <img src={product.image} alt={product.name} />
          <h3>{product.price}</h3>
          <form onSubmit={handleAddReview}>
            <input
              onChange={(e) => setReview(e.target.value)}
              type="text"
              placeholder="review"
            />
            <input
              onChange={(e) => setRating(e.target.value)}
              type="number"
              placeholder="rating"
            />
            <button type="submit">Submit Review</button>
          </form>
          <button onClick={() => handleDelete(product.id)}>Delete Review</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
