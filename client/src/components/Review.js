import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const Review = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {enqueueSnackbar} = useSnackbar()

  const [review, setReview] = useState();

  useEffect(() => {
    fetch(`/reviews/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
            enqueueSnackbar("Customer not logged in", {variant: "error"})
        }
      })
      .then((data) => setReview(data))
      .catch((error) => console.error(error));
  }, [id]);


  const handleDelete = () => {
    fetch(`/reviews/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
            enqueueSnackbar("Review deleted successfully", {variant: "success"})
          navigate("/reviews");
        } else {
          enqueueSnackbar("Error fetching review", {variant: "error"})
        }
      })
      .catch((error) => console.error(error));
  };



  return (
    <div className="review-container">
      {review && (
        <div>
          <h1 className="review-title">Review: {review.review}</h1>
          <div className="review-details">
            <p>
              Rating: <span className="rating">{review.rating}</span>
            </p>
            <p>Customer ID: {review.customer_id}</p>
            <p>Product ID: {review.product_id}</p>
          </div>
          <p className="review-text">{review.review}</p>
          <div className="review-buttons">
            {/* <button className="edit-button" onClick={handleEdit}>
              <i className="fas fa-edit"></i>
            </button> */}
            <button className="delete-button" onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
