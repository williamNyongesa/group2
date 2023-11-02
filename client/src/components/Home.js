import "./home.css";

const Home = ({ products }) => {
    return ( 
        <div className="items">
            {products.map((product) => (
                <div key={product.id}>
                    <h1>{product.name}</h1>
                    <img src = {product.image}/>
                    <h3>{product.price}</h3> 
                </div> 
            ))}
            
        </div>
    );
}
 
export default Home;
