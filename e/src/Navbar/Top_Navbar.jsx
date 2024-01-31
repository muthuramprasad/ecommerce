import React, { useState } from 'react';
import Logo from './Logo/pngtree-online-shop-logo-design-image_235764-removebg-preview.png';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { LogOut } from '../Reducer/ProductSlice'; // Import Link from 'react-router-dom'
import { clearCart } from '../Reducer/CartsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { selectTotalQuantity } from '../Reducer/CartsSlice';



const Top_Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const isAuthenticated = useSelector((state) => state.products.isAuthenticated);
  const totalQuantity = useSelector(selectTotalQuantity);
const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(LogOut());
  };


  return (
    <div className="navbar1">
      <div className="nav-logo">
        <img src={Logo} alt="logo" width={100} height={120} />
        <p>Indo shopping</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => setMenu('shop')}>
          <Link to="/" style={{textDecoration:'none',color:"#515151 "}}>Shop</Link>
          {menu === 'shop' ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu('mens')}>
          <Link to="mens" style={{textDecoration:'none',color:"#515151 "}}>Mens</Link>
          {menu === 'mens' ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu('womans')}>
          <Link to="womans" style={{textDecoration:'none',color:"#515151 "}}>Womans</Link>
          {menu === 'womans' ? <hr /> : <></>}
        </li>
        <li onClick={() => setMenu('kids')}>
          <Link to="kids" style={{textDecoration:'none',color:"#515151 "}}>Kids</Link>
          {menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
       
          
          
      {isAuthenticated ? (
  <Button variant="outlined" onClick={handleLogout}>
    Logout
  </Button>
) : (
  <Link to='login' style={{textDecoration:'none',color:"#515151 "}}>
    <Button variant="outlined" startIcon={<LockOutlinedIcon/>} >
      Login
    </Button>
  </Link>
)}
          
         
        <Link to='carts'><ShoppingCartOutlinedIcon /></Link>
        {isAuthenticated ? (
 <div className="nav-cart-zero"> {totalQuantity}</div>
) : (
  <Link to='login' style={{textDecoration:'none',color:"#515151 "}}>
   <div >{}</div>
  </Link>
)}
      
        
      </div>
    </div>
  );
};

export default Top_Navbar;