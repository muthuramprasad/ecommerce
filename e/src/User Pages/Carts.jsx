import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import Button from '@mui/material/Button';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { removeFromCart, clearCart } from '../Reducer/CartsSlice';
import './Carts.css';
import { ToastContainer, toast } from 'react-toastify';
import { placeOrder } from '../Reducer/orderThunks';

const Carts = () => {
  const products = useSelector((state) => state.carts.items);
  const dispatch = useDispatch();

  const RemoveFromCart = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };
  
  const { totalQuantity, totalCost } = products.reduce(
    (accumulator, product) => {
      accumulator.totalQuantity += product.quantity || 0;
      accumulator.totalCost += (product.quantity || 0) * (product.price || 0);
      return accumulator;
    },
    { totalQuantity: 0, totalCost: 0 }
  );

  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isOrderModalOpen, setOrderModalOpen] = useState(false);
  const [isOrderSuccessToastOpen, setOrderSuccessToastOpen] = useState(false);

  const handleOrderClick = () => {
    if (products.length === 0) {
      toast.error('Please add items to the cart before placing an order.', {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      setOrderModalOpen(true);
    }
  };

  const handleOrderSubmit = () => {
    if (!phoneNumber || !address) {
      alert('Please fill in both phone number and address.');
    } else {
      const orderDetails = {
        phoneNumber,
        address,
        products: products.map((product) => ({
          title: product.title,
          image: product.images && product.images.length > 0 ? product.images[0] : null,
          description: product.description,
          size: product.size,
          totalQuantity: product.quantity,
          totalCost: product.quantity * product.price,
          brand: product.brand,
          colors: product.colors,
          category: product.category,
        })),
      };
  
      console.log('Sending order data:', orderDetails);
  
      // Ensure that `cartItems` is not used and it's `products` in the dispatch
      dispatch(placeOrder(orderDetails));
      dispatch(clearCart());

      setOrderModalOpen(false);
      setOrderSuccessToastOpen(true);
    }
  };
  
  
  

  const handleCloseOrderSuccessToast = () => {
    setOrderSuccessToastOpen(false);
  };

  
  return (
    <Container fluid>
       <ToastContainer />
      <Row>
        <Col>
        <Row>
        <Col>
         <Table striped bordered hover >
        <thead>
          <tr>
            <th className='cart-table-heading'>#</th>
            <th className='cart-table-heading'>Products</th>
            <th className='cart-table-heading'>Title</th>
            <th className='cart-table-heading'>Brand</th>
            <th className='cart-table-heading'>Color</th>
            <th className='cart-table-heading' >Size</th>
            <th className='cart-table-heading'>Category</th>
            <th className='cart-table-heading'>Quantity</th>
            <th className='cart-table-heading'>Total</th>
            <th className='cart-table-heading'>Remove</th>
          </tr>
        </thead>
        <tbody className='cart-table-data-body'>
        
          {products.map((product, index) => (
            <tr key={product._id}>
              <td className='cart-table-data'>{index + 1}</td>
              <td className='cart-table-data'>
                {product.images && product.images.length > 0 && (
                  <img
                    src={`data:image/jpeg;base64,${product.images[0]}`}
                    alt=""
                    width={60}
                    height={60}
                  />
                )}
              </td>
              <td className='cart-table-data' >{product.title}</td>
              <td className='cart-table-data' >{product.brand}</td>
              <td className='cart-table-data' >{product.colors}</td>
              <td className='cart-table-data' >{product.size}</td>
              <td className='cart-table-data' >{product.category}</td>
              <td className='cart-table-data quanitiy' >{product.quantity}</td>
              <td className='cart-table-data' >{product.price}</td>
              <td className='cart-table-data' >   

              <button onClick={() => RemoveFromCart(product._id, product.size)} className='remove-btn'>
  <ClearOutlinedIcon />
</button>

               </td>
             
            </tr>
            
          ))}
         
        </tbody>
      </Table>
        </Col>
        
        
        
        
      </Row>
      <br /><br />
          <Row>
        <Col> 
        <h3>Carts Totals</h3> <br />

        <Row>
        <Col  xs={10}>Total Quantity</Col>
        <Col>{totalQuantity}</Col>
      </Row>
      <hr />

      
      <Row>
        <Col xs={10}>Shipping Fee</Col>
        <Col>Free</Col>
      </Row>
<hr />
      
      <Row>
        <Col xs={10} style={{fontWeight:'800'}}>Total Cost </Col>
        <Col style={{fontWeight:'800'}}> {totalCost}<CurrencyRupeeOutlinedIcon /></Col>
      </Row>

        {/* <h4>Total Quantity: {totalQuantity}</h4>
         <h4>Total Cost: {totalCost}</h4>
         */}
        </Col>

        {/* Promo Code */}
         <Col>
         
         <Row>
        <Col >
        <p style={{marginLeft:'150px'}} className='promo-code-p'>If you Have a Promo Code,Enter it Here</p>
        </Col>
      
      </Row>

      <Row>
        <Col xs={6} style={{marginLeft:'150px'}}>
        <input type="text" className='promo-code-input' placeholder='Enter Your Code' />
        <button  className='promo-code-btn'>Submit</button>
        </Col>
      
      </Row>
<br />
      <Row>
        <Col xs={6} style={{marginLeft:'150px'}}>
        <p className='delivery-p'>Place your order here and experience the convenience of swift delivery right to
           your doorstep.</p>
<Button endIcon={<LocalShippingOutlinedIcon/>} className='order-btn' onClick={handleOrderClick} >Order Here</Button>

        </Col>
          {/* Order Modal/Pop-up */}
          <Dialog open={isOrderModalOpen} onClose={() => setOrderModalOpen(false)}>
            <DialogTitle style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
              Order Details
            </DialogTitle>
            <DialogContent style={{ padding: '20px' }}>
              <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '8px' }}>
                Phone Number:
              </label>
              <input
                type="text"
                id="phoneNumber"
                className='input-field'
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
              />
              <label htmlFor="address" style={{ display: 'block', marginBottom: '8px' }}>
                Address:
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className='input-field'
                style={{ width: '100%', padding: '8px', marginBottom: '16px' }}
              />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                Total Cost: {totalCost} <CurrencyRupeeOutlinedIcon />
              </div>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button onClick={() => setOrderModalOpen(false)} className='order-btn-popup'  style={{ marginRight: '10px' }}>
                Close
              </Button>
              <Button onClick={handleOrderSubmit} className='order-btn-popup' color='primary'>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {/* Order Success Toast */}
          <Snackbar open={isOrderSuccessToastOpen} autoHideDuration={6000} onClose={handleCloseOrderSuccessToast}>
            <MuiAlert elevation={6} variant='filled' onClose={handleCloseOrderSuccessToast} severity='success'>
              Your order has been placed successfully!
            </MuiAlert>
          </Snackbar>
      
      </Row>
         </Col>
      </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Carts;