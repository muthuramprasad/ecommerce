import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import './Orders.css'

const Orders = () => {
  const [orders, setOrders] = useState([]);
 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/get-orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this order?');

    if (shouldDelete) {
      try {
        await axios.delete(`http://localhost:3001/api/delete-order/${orderId}`);
        setOrders(orders.filter(order => order._id !== orderId));
        console.log('Order deleted successfully');
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    } else {
      console.log('Deletion canceled');
    }
  };

 

  return (
    <div>
         <h1 className='delivery-h1'>Orders</h1>
      <h6 className='delivery-h6'>Deliver Your Order</h6> <br />
    <div style={{ overflowY: 'auto', maxHeight: '500px',width:'155%' }} className='orders-container'>
     
      <Table striped bordered hover responsive>
        <thead className='order-table-td ' >
          <tr>
            <th>Title</th>
            <th>Size</th>
            
            <th>Quantity</th>
            <th>Total Cost</th>
            <th>Image</th>
            <th>Phone Number</th>
            
            <th>Address</th>
         
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, orderIndex) => (
            order.products.map((product, productIndex) => (
              <tr key={`${orderIndex}-${productIndex}`} className='delivery-table-row'>
                <td>{product.title}</td>
                <td>{product.size}</td>
                <td>{product.totalQuantity}</td>
                <td>{product.totalCost}</td>
                <td>
                  {product.image && (
                    <img
                      src={`data:image/jpeg;base64,${product.image}`}
                      alt={`Product ${productIndex + 1}`}
                      width={60}
                      height={60}
                    />
                  )}
                </td>
                <td>{order.info && order.info.phoneNumber}</td>
                <td>{order.info && order.info.address}</td>
                
              
                <td>
                  <Button className='order-delete-btn' onClick={() => handleDeleteOrder(order._id)}>

                    <DeleteIcon/>
                  </Button>
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
};

export default Orders;
