import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";
import Navbar from "./NavBar";
import Footer from "./Footer";

function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); 
      });
  }, []);
  
  return (
    <Router>
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp setIsSignedUp={setIsSignedUp} />} />
          <Route path="/signup" element={<SignUp setIsSignedUp={setIsSignedUp} />} />

          <Route path="/home" element={<Home products={products} />} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}
export default App;