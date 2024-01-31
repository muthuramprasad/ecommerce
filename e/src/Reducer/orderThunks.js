import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the thunk to fetch orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
  try {
    const response = await axios.get('http://localhost:3001/api/get-orders');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Define the thunk to place an order
export const placeOrder = createAsyncThunk('order/placeOrder', async (orderData, thunkAPI) => {
  try {
    const response = await axios.post('http://localhost:3001/api/place-order', orderData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});