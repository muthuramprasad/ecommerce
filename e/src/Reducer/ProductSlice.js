import { createSlice } from '@reduxjs/toolkit';

const calculateTotals = (products) => {
  return {
    totalProducts: products.length,
    totalCost: products.reduce((sum, product) => sum + product.price, 0),
    totalMensProducts: products.filter(product => product.category === 'Mens').length,
    totalWomansProducts: products.filter(product => product.category === 'Womans').length,
    totalMensCost: products
      .filter(product => product.category === 'Mens')
      .reduce((sum, product) => sum + product.price, 0),
    totalWomansCost: products
      .filter(product => product.category === 'Womans')
      .reduce((sum, product) => sum + product.price, 0),
    totalKidsProducts: products.filter(product => product.category === 'Kids').length,
    totalKidsCost: products
      .filter(product => product.category === 'Kids')
      .reduce((sum, product) => sum + product.price, 0),
  };
};

let userFromLocalStorage = null;
try {
  const userFromLocalStorageString = localStorage.getItem('user');
  userFromLocalStorage = userFromLocalStorageString ? JSON.parse(userFromLocalStorageString) : null;
} catch (error) {
  console.error('Error parsing user from localStorage:', error);
}

const initialState = {
  products: [],
  totals: {
    totalProducts: 0,
    totalCost: 0,
    totalMensProducts: 0,
    totalWomansProducts: 0,
    totalMensCost: 0,
    totalWomansCost: 0,
    totalKidsProducts: 0,
    totalKidsCost: 0,
  },
  user: userFromLocalStorage,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      const newProducts = action.payload;
      if (Array.isArray(newProducts)) {
        state.products = newProducts;
        state.totals = calculateTotals(newProducts);
      } else {
        console.error('Invalid products payload. Expected an array.');
      }
    },
    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(product => product._id !== productId);
      state.totals = calculateTotals(state.products);
    },
    LoginInSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    LogOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.setItem('isAuthenticated', 'false');
      localStorage.removeItem('user');
    },
  },
});

export const { setProducts, deleteProduct, LoginInSuccess, LogOut } = productSlice.actions;
export default productSlice.reducer;
