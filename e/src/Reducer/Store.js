// store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './ProductSlice';
import CartsSlice, { cartLocalStorageMiddleware } from './CartsSlice';
import OrderSlice from './OrderSlice';

const store = configureStore({
  reducer: {
    products: rootReducer,
    carts: CartsSlice,
    order: OrderSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), cartLocalStorageMiddleware],
});

export default store;
