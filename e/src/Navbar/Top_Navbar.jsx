import React, { useState } from 'react';
import Logo from './Logo/pngtree-online-shop-logo-design-image_235764-removebg-preview.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { NavLink,Link } from 'react-router-dom';
import { LogOut } from '../Reducer/ProductSlice';
import { clearCart } from '../Reducer/CartsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Navbar, Nav } from 'react-bootstrap';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { selectTotalQuantity } from '../Reducer/CartsSlice';
import './Navbar.css'


const Top_Navbar = () => {
  
  const isAuthenticated = useSelector((state) => state.products.isAuthenticated);
  const totalQuantity = useSelector(selectTotalQuantity);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(LogOut());
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className='navbar-top-all'>
      <Navbar.Brand as={NavLink} to="/">
        <img src={Logo} alt="logo" width={100} height={120} />
        <span style={{fontWeight:'900'}}>SHOPPER</span>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto" style={{gap:'60px',display:'flex',justifyContent:'center',marginLeft:'280px'}}>
          <Nav.Link as={NavLink} to="/" className="text-center">Shop</Nav.Link>
          <Nav.Link as={NavLink} to="/mens" className="text-center">Mens</Nav.Link>
          <Nav.Link as={NavLink} to="/womans" className="text-center">Womans</Nav.Link>
          <Nav.Link as={NavLink} to="/kids" className="text-center">Kids</Nav.Link>
        </Nav>
        <Nav className="ml-auto" style={{float:'right',marginLeft:'400px'}}>
          {isAuthenticated ? (
            <Button variant="outline-secondary" onClick={handleLogout}>Logout</Button>
          ) : (
            <Link to='/login' className="nav-link"><Button variant="outline-secondary" startIcon={<LockOutlinedIcon />} >Login</Button></Link>
          )}
          <Nav.Link as={Link} to="/carts"><ShoppingCartOutlinedIcon /></Nav.Link>
          {isAuthenticated && <div className="nav-cart-zero" style={{marginLeft:'-11px'}}>{totalQuantity}</div>}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Top_Navbar;
