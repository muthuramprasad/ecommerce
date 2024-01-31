// Item.js

import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './Item.css';

const Item = () => {
  const [mensProducts, setMensProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/get-products');
        const mensProducts = response.data
          .filter((product) => product.category === 'Mens')
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 8);
        setMensProducts(mensProducts);
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
        <center className='popular_in_men'>POPULAR IN MEN
          <hr className='popular_in_men_hr' />
        </center>

        <br />
        <br />
        {mensProducts.map((product) => (
          <Col key={product._id} className='item_col mb-3' xs={12} md={3}>
            <div className="product-item">
              {product.images[0] && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0]}`}
                  alt={`Product ${product._id}`}
                  className="product-image"
                />
              )}
              <h3 className='title'>{product.title}</h3>
              {/* <p className='description'>{product.description}</p> */}
              <p className='price'>INR {product.price}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Item;
