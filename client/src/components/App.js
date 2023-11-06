import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";
import Navbar from "./NavBar";
import Footer from "./Footer";
import Logout from "./Logout"; 

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
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/home" element={<Home products={products} />} />
          <Route path="/signup" element={<SignUp setIsSignedUp={setIsSignedUp} />} />
          <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;