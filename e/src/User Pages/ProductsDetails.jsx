import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ToastContainer,toast  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import './MensProductsDetails.css'
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { Button } from '@mui/material';
import { addToCart } from '../Reducer/CartsSlice';
import { useDispatch, useSelector } from 'react-redux';


const MensProductsDetails = () => {
  


  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [value, setValue] = useState(4.5);

  const isAuthenticated = useSelector((state) => state.products.isAuthenticated);
  const dispatch = useDispatch();
  const history = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/get-product/${id}`);
        setProduct(response.data);
        dispatch(setProductTitle(response.data.title));
      } catch (error) {
        console.error('Error fetching product details:', error);
        // Handle error, e.g., redirect to an error page
      }
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    // You can show a loading spinner or an error message here
    return <div>Loading...</div>;
  }

  const handleThumbnailClick = (image) => {
    // Update the selected image when a thumbnail is clicked
    setSelectedImage(image);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
  };


  const handleAddToBagLock = () => {
    if (!isAuthenticated) {
     return  toast.error('Please log in to add items to your bag.');
    } 
  };
  
  const handleAddToBag = () => {
    if (!selectedSize) {
      toast.error('Please select a size before adding to your bag.');
      return;
    }
  
    dispatch(addToCart({ ...product, quantity: 1, size: selectedSize }));
    if (isAuthenticated) {
      toast.success('Item added to your bag.');
    }
  };
  
  
  
  


  return (
    <div>
      <ToastContainer />
    <Container fluid="md">
      <Row>
        <Col xs={12} md={6}>
          {/* Left Column */}
          <Row>
            <Col xs={12} md={4} mb={3}>
              {/* Nested Row for Images */}
              <Row>
              <Col xs={10} className="mb-5">
  {product.images && product.images[0] && (
    <img
      src={`data:image/jpeg;base64,${product.images[0]}`}
      alt={`Product ${product._id}`}
      className="product-image-mens1"
      style={{ width: '130px', height: '153px', cursor: 'pointer' }}
      onClick={() => handleThumbnailClick(product.images[0])}
    />
  )}
</Col>

<Col xs={10} className="mb-5">
  {product.images && product.images[1] && (
    <img
      src={`data:image/jpeg;base64,${product.images[1]}`}
      alt={`Product ${product._id}`}
      className="product-image-mens1"
      style={{ width: '130px', height: '153px', cursor: 'pointer' }}
      onClick={() => handleThumbnailClick(product.images[1])}
    />
  )}
</Col>

<Col xs={10}>
  {product.images && product.images[2] && (
    <img
      src={`data:image/jpeg;base64,${product.images[2]}`}
      alt={`Product ${product._id}`}
      className="product-image-mens1"
      style={{ width: '130px', height: '153px', cursor: 'pointer' }}
      onClick={() => handleThumbnailClick(product.images[2])}
    />
  )}
</Col>

               
             
              </Row>
            </Col>
            <Col xs={12} md={8}>
              {/* Big Image */}
              <Col>Big Image
              <img
                  src={`data:image/jpeg;base64,${selectedImage || product.images[0]}`}
                  alt={`Product ${product._id}`}
                  className="big-product-image"
                  style={{ width: '100%', height: 'auto', marginLeft: '-120px' }}
                />
              
              </Col>


            </Col>
          </Row>
        </Col>

        <Col xs={12} md={5}>
        
          <Row >
            <Col>
        
              <Row>
                <Col><h2>{product.title}</h2></Col>
              </Row>
              {/* Description */}
              <Row >
       
<Col className="mb-3 product-description" >{product.description}</Col>
              </Row>
 {/* Rating */}
 <Row className="mb-3" >
                <Col className="mb-2">
                  
                 
                <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.5}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <Box sx={{ ml: 2 }}>{labels[value]}</Box>
    </Box>
                
                </Col>
              </Row>
              <hr />
               {/* Price */}
               <Row className="mb-4">
                <Col> MRP {product.price}   
                <span className='line-over-price' >  {product.old_price}</span> 
                <span className='off'>(55% OFF)</span>  
                <br />
               <span className='tax'>inclusive of all taxes</span>
                </Col>
               
              </Row>
             
              {/* Sizes */}
              <Row className="mb-5">
            <h3 className="mb-4 dress-size-h3">SELECT SIZE</h3>
            <Col
              className={`dress-size ${selectedSize === 'S' ? 'selected-size' : ''}`}
              onClick={() => handleSizeClick('S')}
            >
              S
            </Col>
            <Col
              className={`dress-size ${selectedSize === 'M' ? 'selected-size' : ''}`}
              onClick={() => handleSizeClick('M')}
            >
              M
            </Col>
            <Col
              className={`dress-size ${selectedSize === 'L' ? 'selected-size' : ''}`}
              onClick={() => handleSizeClick('L')}
            >
              L
            </Col>
            <Col
              className={`dress-size ${selectedSize === 'XL' ? 'selected-size' : ''}`}
              onClick={() => handleSizeClick('XL')}
            >
              XL
            </Col>
            <Col
              className={`dress-size ${selectedSize === 'XXL' ? 'selected-size' : ''}`}
              onClick={() => handleSizeClick('XXL')}
            >
              XXL
            </Col>
          </Row>
              {/* Add to Cart */}
              <Row className="mb-3">
                <Col className="mb-3">

                  {
                    isAuthenticated ?( <Button  className='add-to-bag-btn ' onClick={handleAddToBag} >ADD TO BAG</Button>)
                    :
                    ( <Button startIcon={<HttpsOutlinedIcon/>} className='add-to-bag-btn lock' onClick={handleAddToBagLock} >ADD TO BAG</Button>)
                  }
              
               
                
                </Col>
              </Row>
              <Row >
                <Col >
              <h6 >DELIVERY OPTIONS </h6>
              <ul className='delivery-option'>
                <p>100% Original Products</p>
                <p>Pay on delivery might be available</p>
                <p>Easy 14 days returns and exchanges</p>
                <p>Try & Buy might be available</p>
              </ul>
                
                </Col>
              </Row>

            </Col>
          </Row>
        </Col>
      </Row>
    </Container>

    </div>
  );
};

export default MensProductsDetails;
