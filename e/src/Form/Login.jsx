import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { LoginInSuccess } from '../Reducer/ProductSlice';


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === 'admin@mail.com' && password === 'admin') {
      return navigate('/dashboard');
    }

    if (!emailRegex.test(email)) {
      toast.error('Invalid email format');
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/signin", { email, password });
      console.log(response.data);

      dispatch(LoginInSuccess(response.data.user));

      toast.success(`Welcome`);

      setEmail('');
      setPassword('');

    } catch (error) {
      console.log(error);
      toast.error('Invalid email or password');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='loginsignup'>
          <div className="loginsignup-container-login">
            <h2 style={{ textTransform: 'uppercase' }}>Sign in</h2>
            <div className='loginsignup-fields'>
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
              Continue
            </Button>
            <p className='loginsignup-login'>
              Create a New Account? <Link to='/registration' style={{ textDecoration: 'none', listStyleType: 'none' }}><span>Click Here</span></Link>
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

export default SignIn;
