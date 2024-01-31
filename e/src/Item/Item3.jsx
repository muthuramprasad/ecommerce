// Item.js

import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './Item3.css';

const Item = () => {
  const [kidsProducts, setKidsProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/get-products');
        const kidsProducts = response.data
          .filter((product) => product.category === 'Kids')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);
        setKidsProducts(kidsProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container style={{ verticalAlign: 'center', alignItems: 'center' }}>
      {error && <p>{error}</p>}
      <Row>
        <center className='popular_in_kids'>POPULAR IN KIDS
          <hr className='popular_in_Kids_hr3' />
        </center>

        <br />
        <br />
        {kidsProducts.map((product) => (
          <Col key={product._id} className='item_col3' xs={12} md={3}>
            <div className="product-item3">
              {product.images[0] && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0]}`}
                  alt={`Product ${product._id}`}
                  className="product-image3"
                />
              )}
              <h3 className='title3'>{product.title}</h3>
              {/* <p className='description3'>{product.description}</p> */}
              <p className='price3'>INR {product.price}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Item;
