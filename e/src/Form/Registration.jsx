// SignUp.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; // Assuming the CSS file is in the same directory
import axios from 'axios';




const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const passwordRegex = /^[A-Za-z0-9]+$/;
  
    if (!nameRegex.test(name)) {
      toast.error('Name can only contain letters');
      return;
    }
  
    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return;
    }
  
    if (!passwordRegex.test(password)) {
      toast.error('Password can only contain alphanumeric characters');
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/api/signup", { name, email, password });
      console.log(response.data);
      toast.success('Account created successfully');
  
      // Reset input fields
      setName('');
      setEmail('');
      setPassword('');
  
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Server responded with data:', error.response.data);
        console.error('Status code:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error during request setup:', error.message);
      }
  
      // Handle the error or display an error message to the user
      toast.error('Error creating account');
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='loginsignup'>
          <div className="loginsignup-container">
            <h2 style={{ textTransform: 'uppercase' }}>Sign Up</h2>
            <div className='loginsignup-fields'>
              <TextField
                label="Your Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                type="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginBottom: '10px' }}
              />
            </div>
            <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
            </Button>
            <p className='loginsignup-login'>
              Already have an account? <Link to='/login' style={{ textDecoration: 'none', listStyleType: 'none' }}><span>Login Here</span></Link>
            </p>
            <div className="loginsignup-agree">
              <FormControlLabel
                control={<Checkbox name="agreement" />}
                label="By continuing, I agree to the terms of use & privacy policy."
                className='loginsignup-agree-label'
              />
            </div>
            <p></p>
          </div>
        </div>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default SignUp;
