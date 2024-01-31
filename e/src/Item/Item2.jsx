// Item.js

import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './Item2.css';

const Item = () => {
  const [mensProducts, setMensProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/get-products');
        const mensProducts = response.data
          .filter((product) => product.category === 'Womans')
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
        <center className='popular_in_woman2'>POPULAR IN WOMAN
          <hr className='popular_in_woman_hr2' />
        </center>

        <br />
        <br />
        {mensProducts.map((product) => (
          <Col key={product._id} className='item_col2' xs={12} md={3}>
            <div className="product-item2">
              {product.images[0] && (
                <img
                  src={`data:image/jpeg;base64,${product.images[0]}`}
                  alt={`Product ${product._id}`}
                  className="product-image2"
                />
              )}
              <h3 className='title2'>{product.title}</h3>
              {/* <p className='description2'>{product.description}</p> */}
              <p className='price2'>INR {product.price}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Item;
