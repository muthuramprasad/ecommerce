import { createSlice } from '@reduxjs/toolkit';
import { placeOrder } from './orderThunks';

const initialState = [];

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { orderDetails, cartItems } = action.payload;
      console.log('Order Details:', orderDetails);
      console.log('Cart Items:', cartItems);
      return [...state, { orderDetails, cartItems }];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      console.log('Order placed successfully:', action.payload);
      return state;
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      console.error('Order placement failed:', action.payload);
      return state;
    });
    
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;