import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Table, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import axios from 'axios';
import './Update.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';

function AutoLayoutExample() {
  const [products, setProducts] = useState([]);
  const [totals, setTotals] = useState({
    totalProducts: 0,
    totalCost: 0,
    totalMensProducts: 0,
    totalWomensProducts: 0,
    totalWomensProductsCost: 0,
    totalMensProductsCost: 0,
    totalKidsProducts: 0,
    totalKidsProductsCost: 0,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    brand: '',
    category: '',
    colors: '',
    old_price: '',
    price: '',
    image1: '',
    image2: '',
    image3: '',
    image1Src: null,
    image2Src: null,
    image3Src: null,
  });

  const validateForm = () => {
    const errors = [];

    if (!/./.test(formData.title)) {
      errors.push('Title should not be empty.');
    }
    
    if (!/./.test(formData.description)) {
      errors.push('Description should not be empty.');
    }


    // Validate old_price and price
    if (isNaN(formData.old_price) || formData.old_price < 500) {
      errors.push('Old Price must be a number not less than 500.');
    }

    if (isNaN(formData.price) || formData.price < 500) {
      errors.push('Price must be a number not less than 500.');
    }

    // Validate other fields and check for empty values
    for (let key in formData) {
      if (['title', 'description', 'old_price', 'price'].includes(key)) {
        continue; // Skip the fields already validated
      }

      if (formData[key] === '') {
        errors.push(`${key} must not be empty.`);
      }
    }

    return errors;
  };

  // Handle Submit

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const validationErrors = validateForm();
  
    if (validationErrors.length > 0) {
      // Display validation errors in toast alert
      validationErrors.forEach((error) => {
        toast.error(error, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      });
      return;
    }
  
    try {
      const form = new FormData();
  
      for (let i = 1; i <= 3; i++) {
        if (formData[`image${i}`]) {
          form.append(`image${i}`, formData[`image${i}`][0]);
        }
      }
  
      for (let key in formData) {
        if (![`image1`, `image2`, `image3`].includes(key)) {
          form.append(key, formData[key]);
        }
      }
  
      if (selectedProduct) {
        // If in edit mode, add product ID to form data
        form.append('productId', selectedProduct._id);
      }
  
      await axios.post('http://localhost:3001/api/add-product', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Product added/updated successfully');
  
      toast.success('Product added/updated successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
  
      // Clear form values after successful submission
      resetForm();
  
      // Fetch updated products
      fetchProducts();
    } catch (error) {
      console.error('Error adding/updating product:', error);
  
      toast.error('Error adding/updating product. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
  

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      brand: '',
      category: '',
      colors: '',
      old_price: '',
      price: '',
      image1: '',
      image2: '',
      image3: '',
    });
  };

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageSrc = e.target.result;

        setFormData((prevData) => ({
          ...prevData,
          [name]: files,
          [`${name}Src`]: imageSrc,
        }));
      };

      reader.readAsDataURL(files[0]);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };



  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/get-products');
    setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');

    if (!confirmDelete) {
      // If the user clicks "Cancel" in the confirmation dialog, do nothing
      return;
    }

    try {
      await axios.delete(`http://localhost:3001/api/delete-product/${productId}`);
      toast.success('Product deleted successfully', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
  
      // Update Redux state after deletion
      setProducts((prevProducts) => prevProducts.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error deleting product. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  
  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      brand: product.brand,
      category: product.category,
      colors: product.colors,
      old_price: product.old_price,
      price: product.price,
      image1: '',
      image2: '',
      image3: '',
      image1Src: product.images[0] ? `data:image/jpeg;base64,${product.images[0]}` : null,
      image2Src: product.images[1] ? `data:image/jpeg;base64,${product.images[1]}` : null,
      image3Src: product.images[2] ? `data:image/jpeg;base64,${product.images[2]}` : null,
    });
    handleOpenModal();
  };




// Search Filter
const [searchQuery, setSearchQuery] = useState('');

const handleSearchInputChange = (event) => {
  setSearchQuery(event.target.value);
};

const filteredProducts = products.filter((product) =>
  product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.colors.toLowerCase().includes(searchQuery.toLowerCase()) ||
  product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
  String(product.price).includes(searchQuery) ||
  String(product.old_price).includes(searchQuery)
);











  return (
    <div>
    <div>
     <Container className="custom-container" fluid="md">
        <ToastContainer />
        <Dialog open={isModalOpen} onClose={handleCloseModal}>
          <DialogTitle>Add Product</DialogTitle>
          <DialogContent>
            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <Row className="custom-row">
            <Col className="custom-col">
              <label htmlFor="name" className="custom-label">
                Name of the Dress:
              </label>{' '}
              <br />
              <input
  type="text"
  id="name"
  name="title"
  value={formData.title}
  className="custom-input"
  onChange={handleInputChange}  // Add this line
/>
            </Col>

            <Col className="custom-col">
              <label htmlFor="description" className="custom-label">
                Description of the Dress:
              </label>
              <br />
              <textarea
  id="description"
  name="description"
  value={formData.description}
  rows="4"
  cols="50"
  className="custom-input"
  onChange={handleInputChange}  // Add this line
></textarea>
            </Col>

            <Col className="custom-col">
              <label htmlFor="brand" className="custom-label">
                Brand Name :
              </label>{' '}
              <br />
              <select
                id="brand"
                value={formData.brand}
                name="brand"
                className="custom-input"
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option value="Levis">Levi’s</option>
    <option value="Being Human">Being Human</option>
    <option value="Zara">Zara</option>
    <option value="H&M">H&M</option>
    <option value="Forever 21">Forever 21</option>
    <option value="Gucci">Gucci</option>
    <option value="Prada">Prada</option>
    <option value="Dior">Dior</option>
    <option value="Calvin Klein">Calvin Klein</option>
    <option value="Ralph Lauren">Ralph Lauren</option>
    <option value="Versace">Versace</option>
    <option value="Chanel">Chanel</option>
                {/* ... (other options) */}
              </select>
            </Col>

            <Col className="custom-col">
              <label htmlFor="category" className="custom-label">
                Category
              </label>
              <br />
              <select
                id="category"
                value={formData.category}
                name="category"
                className="custom-input"
                onChange={handleInputChange}
              >
                <option value=""></option>
                <option value="Mens">Mens</option>
                <option value="Womans">Womans</option>
                <option value="Kids">Kids</option>
              </select>
            </Col>
          </Row>

          <br />
          <Row className="custom-row">
          <Col className="custom-col">
  <label htmlFor="images1" className="custom-label">
    Image 1:
  </label>{' '}
  <br />
  
  {formData.image1Src && <img src={formData.image1Src} alt="Image 1" className="custom-label" width={240} height={300} style={{borderRadius:'15px',marginLeft:'60px'}} />}

 <br />
 <br />
  <input
    type="file"
    id="images1"
    placeholder="Enter Your Image 1"
    className="custom-input"
    name="image1"
    onChange={handleInputChange}
    multiple
  />
</Col>

<Col className="custom-col">
  <label htmlFor="images2" className="custom-label">
    Image 2:
  </label>{' '}
  <br />
  {formData.image2Src && <img src={formData.image2Src} alt="Image 2" className="custom-label" width={240} height={300} style={{borderRadius:'15px',marginLeft:'60px'}}/>}
  <br />
  <input
    type="file"
    id="images2"
    placeholder="Enter Your Image 2"
    className="custom-input"
    name="image2"
    onChange={handleInputChange}
    multiple
  />
</Col>

<Col className="custom-col">
  <label htmlFor="images3" className="custom-label">
    Image 3:
  </label>{' '}
  <br />
  {formData.image3Src && <img src={formData.image3Src} alt="Image 3" className="custom-label" width={240} height={300} style={{borderRadius:'15px',marginLeft:'60px'}}/>}
  <br />
  <input
    type="file"
    id="images3"
    placeholder="Enter Your Image 3"
    className="custom-input"
    name="image3"
    onChange={handleInputChange}
    multiple
  />
</Col>



           
          </Row>

          <br />

          <Row className="custom-row">
            <Col className="custom-col">
              <label htmlFor="colors" className="custom-label">
                Colors:
              </label>{' '}
              <br />
              <select
                id="colors"
                name="colors"
                value={formData.colors}
                className="custom-input"
                onChange={handleInputChange}
              >
                <option value=""></option>
               <option value="Red">Red</option>
    <option value="Blue">Blue</option>
    <option value="Green">Green</option>
    <option value="Yellow">Yellow</option>
    <option value="Purple">Purple</option>
    <option value="Orange">Orange</option>
    <option value="Pink">Pink</option>
    <option value="Brown">Brown</option>
    <option value="Gray">Gray</option>
    <option value="Black">Black</option>
    <option value="White">White</option>
    <option value="Teal">Teal</option>
              </select>
            </Col>

            <Col className="custom-col">
            <label htmlFor="price" className="custom-label">
                old_Price
              </label>{' '}
              <br />
              <input
  type="number"
  id="price"
  value={formData.old_price}
  onChange={handleInputChange}  // Add this line
  name="old_price"
  placeholder="INR"
  className="custom-input"
/>
            </Col>

            <Col className="custom-col">
              <label htmlFor="price" className="custom-label">
                Price
              </label>{' '}
              <br />
              <input
  type="number"
  id="price"
  value={formData.price}
  onChange={handleInputChange}  // Add this line
  name="price"
  placeholder="INR"
  className="custom-input"
/>
            </Col>

            <Col className="custom-col">
              <br />
              <center>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<AddShoppingCartIcon />}
                >
                  Submit
                </Button>
              </center>
            </Col>
          </Row>
          </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Close</Button>
          </DialogActions>
        </Dialog>
        <br />
        <br />
        <br />
      
      </Container>

      <br />
     
    </div>
   
    <Container fluid style={{marginTop:'-700px',marginLeft:'30px',padding:'10px'}}>
  
      <Col>
      <h1 className='update'>Update</h1>
      <h6 className='update_h6'>Update The All Products </h6> 
      </Col>
    
    <Row>
        <Col xs={12} style={{display:'flex'}}>
          
          
        <div>
        <TextField
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon
                        sx={{
                          color: 'action.active',
                          marginLeft: '10px',
                        }}
                      />
                    ),
                  }}
                />
    </div>



          <Button style={{marginLeft:'700px'}} 
          className='add_product_btn'
          onClick={handleOpenModal} 
          startIcon={<AddCircleOutlineIcon/>}>Add Product</Button>
        </Col>
      
      </Row>

   
    </Container >
    {/* <Row>
    <Col>
          {products.map((product, index) => (
            <React.Fragment key={index}>
              <Col>
                {product.images.length > 0 && (
                  <img src={`data:image/jpeg;base64,${product.images[0]}`} alt={`Product ${index + 1}`} />
                )}
              </Col>
            </React.Fragment>
          ))}
        </Col>
      </Row> */}
      <Container fluid style={{maxWidth:'1200px',maxHeight:'400px'}}>
      <Row >
    
        <Col>
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <Table >
      <thead>
      <tr className='tr'>
    <th>#</th>
    <th>Title</th>
    <th>Description</th>
    <th>Brand</th>
    <th>Category</th>
    <th>Image 1</th>
    <th>Image 2</th>
    <th>Image 3</th>
    <th>Color</th>
    <th>Old Price</th>
    <th>Price</th>
    <th>Edit</th>
    <th>Delete</th>
  </tr>
   
      </thead>
      <tbody className='update-table-data-bottom'>
     <br />
          {filteredProducts.map((product, index) => (
            <tr key={index} className='table_row'>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td style={{maxWidth:'100px'}}>{product.description}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td>
                {product.images[0] && (
                  <img src={`data:image/jpeg;base64,${product.images[0]}`} height={80} width={80} alt={`Product ${index + 1}`} />
                )}
              </td>
              <td>
                {product.images[1] && (
                  <img src={`data:image/jpeg;base64,${product.images[1]}`}  height={80} width={80} alt={`Product ${index + 1}`} />
                )}
              </td>
              <td>
                {product.images[2] && (
                  <img src={`data:image/jpeg;base64,${product.images[2]}`} 
                  height={80} width={80} s 
                  alt={`Product ${index + 1}`}
                 
                  />
                )}
              </td>
              <td>{product.colors}</td>
              <td>INR {product.old_price}</td>
              <td> INR {product.price}</td>
         
              <td>
                <Button onClick={() => handleEditProduct(product)} className='edit_btn'><EditIcon/></Button>
              </td>

              <td>
  <Button onClick={() => handleDeleteProduct(product._id)} className='delete_btn'><DeleteIcon /></Button>
</td> <br />

            </tr>
          ))}
        </tbody>
    </Table>
    </div>
        </Col>
      </Row>
      <Row>
     
      </Row>
      </Container>
    </div>
  );
}

export default AutoLayoutExample;