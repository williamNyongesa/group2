import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import { css } from "@emotion/react";

// const productStyles = css`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-between;
//   margin: 20px;
// `;

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

const Product = () => {
  const { id, customer_id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`/products/${id}`) 
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch product data');
        }
      })
      .then((data) => {
        setProduct(data)
        console.log(data.id)
        })
      .catch((error) => console.error(error));
      

  }, [id]);

  return (
    <div key={product.id} css={cardStyles} className="product-card">
      <h2 css={headingStyles}>Name: {product.name}</h2>
      <p>Price: ${product.price}</p>
      <img src={product.image} alt="product" css={imageStyles} />
      <p style={{ fontWeight: 'bold', color: 'green' }}>
        In Stock: {product.in_stock ? 'Yes' : 'No'}<br />
      </p>
      {console.log(product.id)}
      <Link
        to={{
          pathname: `/product/${product.id}/review`,
          state: { customer_id: customer_id }
        }}
      >
        Write a Review
      </Link>
    </div>
  );
};

export default Product;
