import "./Home.css"
import { Link } from "react-router-dom";
import { css } from "@emotion/react";

const productStyles = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 20px;
`;

const cardStyles = css`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 30%;
`;

const headingStyles = css`
  font-size: 1.5rem;
`;

const imageStyles = css`
  max-width: 100%;
`;

const Home = ({ products }) => {

    const limitedProducts = products.slice(0, 12);


  return (
    <div css={productStyles} className="product-container">
      {limitedProducts.map((product) => (
        <div key={product.id} css={cardStyles} className="product-card">
          <h2 css={headingStyles}>Name: {product.name}</h2>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt="product" css={imageStyles} />
          <p style={{ fontWeight: 'bold', color: 'green' }}>
            In Stock: {product.in_stock ? 'Yes' : 'No'}<br></br>
            <button><Link to={`/products/:id`}>View Product Details</Link></button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;
