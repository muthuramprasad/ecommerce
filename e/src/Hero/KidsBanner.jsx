import React from 'react'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Png from './Carousel Images/Kids/download__3_-removebg-preview.png'
import './KidsBanner.css'
import { Link } from 'react-router-dom';


const WomanBanner = () => {
  return (
    <Container  className='kids' fluid>
    <Row>
    
    <Col xs={12} md={7} className='hero-all-text-kids'>
  <h2 className='top-new-kids'>KIDS SALE EVENT</h2>
  <p className='For-kids'>Discover Exciting Collections for Kids</p>
  <p className='BEST-SELLER-kids'>Explore the Latest Models & Styles for Your Little Ones</p>
  <Link to='kids' style={{listStyleType:'none',textDecoration:'none'}}><p className='buy-Now'>Buy Now </p></Link>

</Col>


      <Col xs={12} md={4}>
        <img src={Png} alt="" className="img-fluid-kids"  />
      </Col>
    </Row>
  </Container>
  )
}

export default WomanBanner
