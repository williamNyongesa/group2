import '../App.css';
import Landing from './Landing';
import {Routes, Route} from "react-router-dom"
import Home from './Home';
import SignupForm from './Signup';
import Login from './Login';
import {useState, useEffect} from "react"
// import Navbar from './Navbar';

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:5555/products")
    .then(r => r.json())
    .then((data) => setProducts(data))
  })

  return (
    <div className="App">
     <Routes>
      <Route element= {<Landing/>}>
        <Route path= "/" element={<Home products ={products} />} />
        <Route path= "/signup" element={<SignupForm />} />
        <Route path= "/login" element={<Login />} />
      </Route>
    </Routes>
      
    </div>
  );
}

export default App;