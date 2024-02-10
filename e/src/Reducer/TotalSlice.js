// TotalSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Function to initialize state from local storage
const initializeStateFromLocalStorage = () => {
  const storedState = localStorage.getItem('productTotals');
  if (storedState) {
    return JSON.parse(storedState);
  }
  return {
    totalProducts: 0,
    totalCost: 0,
    totalMensProducts: 0,
    totalMensProductsCost: 0,
    totalWomansProducts: 0,
    totalWomansProductsCost: 0,
    totalKidsProducts: 0,
    totalKidsProductsCost: 0,
  };
};

const productTotalsSlice = createSlice({
  name: 'productTotals',
  initialState: initializeStateFromLocalStorage(), // Initialize state from local storage
  reducers: {
    updateProductTotals(state, action) {
      const {
        totalProducts,
        totalCost,
        totalMensProducts,
        totalMensProductsCost,
        totalWomansProducts,
        totalWomansProductsCost,
        totalKidsProducts,
        totalKidsProductsCost,
      } = action.payload;

      // Update state
      state.totalProducts = totalProducts;
      state.totalCost = totalCost;
      state.totalMensProducts = totalMensProducts;
      state.totalMensProductsCost = totalMensProductsCost;
      state.totalWomansProducts = totalWomansProducts;
      state.totalWomansProductsCost = totalWomansProductsCost;
      state.totalKidsProducts = totalKidsProducts;
      state.totalKidsProductsCost = totalKidsProductsCost;

      // Store updated state in local storage
      localStorage.setItem('productTotals', JSON.stringify(state));
    },
  },
});

export const { updateProductTotals } = productTotalsSlice.actions;
export default productTotalsSlice.reducer;
