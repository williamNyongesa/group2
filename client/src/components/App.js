import '../App.css';
import Landing from './Landing';
import {Routes, Route} from "react-router-dom"
import Home from './Home';
import AboutUs from './About';
import SignupForm from './Signup';
import Login from './Login';
import {useState, useEffect} from "react"
import Footer from './Footer';
import Reviews from './Reviews';
import ContactUs from './Contact';

function App() {
  const [products, setProducts] = useState([])
  
  const [reviews, setReviews] =useState([])

  useEffect(() =>{
      fetch("http://127.0.0.1:5555/reviews")
      .then(r=>r.json())
      .then(data => setReviews(data))
  },[])

  const onSubmitReview = (reviewData) => {
    // Send review data to the server using a fetch POST request
    fetch('http://127.0.0.1:5555/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response (e.g., update reviews state)
        setReviews([...reviews, data]);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error posting review:', error);
      });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5555/products")
    .then(r => r.json())
    .then((data) => {
      console.log(products)
      setProducts(data)})
  }, [products])

  return (
    <div className="App">
     <Routes>
      <Route element= {<Landing/>}>
        <Route path= "/" element={<Home products ={products} />} />
        <Route path= "/about" element={<AboutUs />} />
        <Route path= "/signup" element={<SignupForm />} />
        <Route path= "/login" element={<Login />} />
        <Route path= "/contactus" element={<ContactUs />} />
        <Route path= "/reviews" element={<Reviews reviews={reviews} onSubmit={onSubmitReview}/>} />
      </Route>
    </Routes>
      <Footer />
    </div>
  );
}

export default App;