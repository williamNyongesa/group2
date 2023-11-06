import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './Landing';
import Home from './Home';
import AboutUs from './About';
import SignupForm from './Signup';
import Login from './Login';
import Footer from './Footer';
import Reviews from './Reviews';
import Contact from './Contact';
import Product from './Product';
import ReviewForm from './ReviewForm';
import Review from './Review';
import Logout from './Logout';

function App() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loggedInCustomer, setLoggedInCustomer] = useState({})
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    fetch('/reviews')
      .then((r) => r.json())
      .then((data) => setReviews(data));
  }, []);

  useEffect(() => {
    fetch('/session')
      .then((r) => r.json())
      .then((data) => setLoggedInCustomer(data));
  }, []);

  const handleReviewSubmit = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  useEffect(() => {
    fetch('/products')
      .then((r) => r.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route element={<Landing />}>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<Product loggedInCustomer={loggedInCustomer}/>} />
          <Route
            path="/product/:id/review"
            element={
              <ReviewForm
                onSubmit={handleReviewSubmit}
                // productId={state ? state.product_id : null}
                customer_id={state ? state.customer_id : null}
              />
            }
          />
          <Route path="/reviews" element={<Reviews reviews={reviews} />} />
          <Route path="/reviews/:id" element={<Review  />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
