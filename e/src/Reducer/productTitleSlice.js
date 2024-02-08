// productTitleSlice.js
import { createSlice } from '@reduxjs/toolkit';

const productTitleSlice = createSlice({
  name: 'productTitle',
  initialState: '',
  reducers: {
    setProductTitle: (state, action) => {
      return action.payload;
    },
  },
});

export const { setProductTitle } = productTitleSlice.actions;

export default productTitleSlice.reducer;
