import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ImageLogo from '../Navbar/Logo/pngtree-online-shop-logo-design-image_235764-removebg-preview.png'
import { Link } from 'react-router-dom';
import './AdminNavBar.css'

function NavScrollExample() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary admin-nav-bar">
      <Container fluid>
       <Navbar.Brand style={{color:'black',fontWeight:'900'}}>
            <img
              alt=""
              src={ImageLogo}
              width="80"
              height="80"
              className="d-inline-block align-top admin-logo"
              
            />
           Shopper
          </Navbar.Brand>
       
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
         
            
          </Nav>
          <Form className="d-flex">
            <Navbar.Brand style={{color:'black',fontWeight:'900'}}>Ram Prasad</Navbar.Brand>
            <Link to='/'><Button  style={{color:'black',fontWeight:'900',background:'white'}}>Logout</Button></Link>
            
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
