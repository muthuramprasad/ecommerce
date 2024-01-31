import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {placeOrder } from '../Reducer/orderThunks';

const Orders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch orders when the component mounts
    dispatch(placeOrder());
  }, [dispatch]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.phoneNumber}</td>
                  <td>{order.address}</td>
                  <td>
                    <ul>
                      {order.products.map((product, productIndex) => (
                        <li key={productIndex}>
                          <strong>Title:</strong> {product.title},{' '}
                          <strong>Size:</strong> {product.size},{' '}
                          <strong>Quantity:</strong> {product.totalQuantity},{' '}
                          <strong>Total Cost:</strong> {product.totalCost}
                          {product.image && (
                            <img
                              src={`data:image/jpeg;base64,${product.image}`}
                              alt=""
                              width={60}
                              height={60}
                            />
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Orders;
