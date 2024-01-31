import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Png from './Carousel Images/Womens/full-length-stylish-multicultural-women-260nw-1855048690-removebg-preview.png'
import './WomanBanner.css'
import { Link } from 'react-router-dom';


const WomanBanner = () => {
  return (
    <Container  className='woman' fluid>
    <Row>
    
      <Col xs={12} md={7} className='hero-all-text'>
        <h2 className='Exclusive'>Exclusive</h2>
         <p className='Offers-For-You'> Offers For You</p>
        <p className='BEST-SELLER'>ONLY OF BEST SELLER PRODUCSTS</p>
        <Link to='womans' style={{listStyleType:'none',textDecoration:'none'}}> <p className='Check-Now'>Check Now</p></Link>
       
        
      </Col>

      <Col xs={12} md={4}>
        <img src={Png} alt="" className="img-fluid-woman"  />
      </Col>
    </Row>
  </Container>
  )
}

export default WomanBanner
