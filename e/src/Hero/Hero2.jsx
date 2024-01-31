import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Png from './Carousel Images/mens/MMSCENE_PORTRAITS__Wilhelmina_LA_Fresh_Faces_by_Jon_Wong-removebg-preview.png'
import './Hero.css'
import { Link } from 'react-router-dom';



const Hero2 = () => {


  return (
   
      <Container  className='hero' fluid>
      <Row>
      
        <Col xs={12} md={8} className='hero-all-text'>
          <h2 className='hero-left-h2'>NEW ARRIVAL ONLY</h2>
           <p className='hero-left-p'> Collection</p>
          <p className='hero-left-p'>For EveryOne</p>
          <Link to='/mens' style={{ listStyleType: 'none', textDecoration: 'none' }}>
  <p className='hero-latest-button'>Latest Collection</p>
</Link>

     
          
        </Col>

        <Col xs={12} md={4}>
          <img src={Png} alt="" className="img-fluid" width={400} />
        </Col>
      </Row>
    </Container>
    
  )
}

export default Hero2
