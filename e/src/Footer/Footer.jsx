import React from 'react';
import './Footer.css';
import logo from '../Navbar/Logo/pngtree-online-shop-logo-design-image_235764-removebg-preview.png';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={logo} alt="Logo" srcSet="" width={100} height={120} />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-link">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <InstagramIcon style={{color:'red'}} />
          <FacebookIcon style={{color:'blue'}}/>
          <WhatsAppIcon style={{color:'green'}}/>
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright &copy; 2024 - All Right Reserve By MuthuRam Prasad</p>
      </div>
    </div>
  );
};

export default Footer;
