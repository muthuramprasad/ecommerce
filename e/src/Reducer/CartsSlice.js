// cartsSlice.js

import { createSlice } from '@reduxjs/toolkit';

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('cartState');
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (error) {
    console.error('Error loading state from localStorage:', error);
    return { items: [] };
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cartState', serializedState);
  } catch (error) {
    console.error('Error saving state to localStorage:', error);
  }
};

const initialState = loadState();
const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item._id === newItem._id && item.size === newItem.size
      );

      if (existingItem) {
        // If the same product with the same size is found, update quantity
        existingItem.quantity += newItem.quantity;
      } else {
        // If the same product with a different size or a new product is added, create a new entry
        state.items.push(newItem);
      }
    },


   removeFromCart: (state, action) => {
  const { id, size } = action.payload;
  const itemToRemove = state.items.find((item) => item._id === id && item.size === size);

  if (itemToRemove) {
    if (itemToRemove.quantity > 1) {
      itemToRemove.quantity -= 1;
    } else {
      state.items = state.items.filter((item) => !(item._id === id && item.size === size));
    }
  }
},



    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartsSlice.actions;

// Selector to calculate the total quantity
export const selectTotalQuantity = (state) => {
  return state.carts.items.reduce((total, item) => total + item.quantity, 0);
};

// Middleware to handle local storage
export const cartLocalStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Get the current state
  const currentState = store.getState().carts;

  try {
    // Limit the size of the items array
    const maxItems = 10; // Set your desired maximum number of items
    const limitedItems = currentState.items.slice(-maxItems);

    // Create a simplified state for storage
    const simplifiedState = {
      items: limitedItems,
    };

    // Serialize and store the simplified state
    const serializedState = JSON.stringify(simplifiedState);
    localStorage.setItem('cartState', serializedState);
  } catch (error) {
    console.error('Error handling local storage:', error);
  }

  return result;
};


export default cartsSlice.reducer;