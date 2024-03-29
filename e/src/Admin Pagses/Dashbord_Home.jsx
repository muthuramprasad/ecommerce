import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import "./Dashbord_Home.css"

const Home = () => {
  const dispatch = useDispatch();
  

  const TotalProductCost = useSelector(
    (state) => state.productTotals.totalProducts
  );

  const totalCost = useSelector(
    (state) => state.productTotals.totalCost
  );

  const totalMensProducts = useSelector(
    (state) => state.productTotals.totalMensProducts
  );


  const totalMensProductsCost = useSelector(
    (state) => state.productTotals.totalMensProductsCost
  );


  const totalWomansProducts = useSelector(
    (state) => state.productTotals.totalWomansProducts
  );


  const totalWomansProductsCost = useSelector(
    (state) => state.productTotals.totalWomansProductsCost
  );


  const totalKidsProducts = useSelector(
    (state) => state.productTotals.totalKidsProducts
  );


  const totalKidsProductsCost= useSelector(
    (state) => state.productTotals.totalKidsProductsCost
  );

  return (
    <div>
      <div className="dashboard" style={{ float: 'left' }}>
        <h1 className='dashboard_h1'>Dashboard</h1>
        <h6 className='welcone_h6'>Welcome To Your dashboard</h6>
      </div>
      <br />
      <br />
      <br />
      <br />
      <Container fluid>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <div className="total_products">
              <h1 className='total_product_count'>{TotalProductCost}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Total Products</h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>TOTAL NO OF PRODUCTS</h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <ShoppingCartOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="total_products_cost">
              <h1 className='total_product_count'> {totalCost}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Total Costs</h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>Total Product Costs</h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <CurrencyRupeeOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="total_Mens_products">
              <h1 className='total_product_count'> {totalMensProducts}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Total Mens Products</h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>Total Mens Product </h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <GroupAddOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="total_Mens_products">
              <h1 className='total_product_count'> {totalMensProductsCost}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Mens Products Costs</h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>Total Mens Product Costs</h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <CurrencyRupeeOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col xs={12} md={6} lg={3}>
            <div className="total_womens_products">
              <h1 className='total_product_count'> {totalWomansProducts}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Womans Products </h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>Total No Of Womans Products</h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <GroupAddOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="total_womens_products">
              <h1 className='total_product_count'> {totalWomansProductsCost}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Womans Products Costs </h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>Total costs of Womans Products</h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <CurrencyRupeeOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="total_kids_products">
              <h1 className='total_product_count'> {totalKidsProducts}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Kids Products </h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>Total No Of kids Products</h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <CurrencyRupeeOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
          <Col xs={12} md={6} lg={3}>
            <div className="total_kids_products">
              <h1 className='total_product_count'> {totalKidsProductsCost}</h1>
              <h6 className='total_product' style={{ fontSize: '18px' }}>Total Kids Products Costs </h6>
              <h6 className='total_product_number' style={{ fontSize: '10px' }}>Total No Of kids Products</h6>
              <div className="icon" style={{ marginLeft: '230px', marginTop: '-80px' }}>
                <CurrencyRupeeOutlinedIcon style={{ fontSize: '51px' }} />
              </div>
              <br />
            </div>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
    </div>
  );
};

export default Home;
