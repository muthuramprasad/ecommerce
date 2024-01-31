// models.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Assuming you have a Product model
  quantity: Number,
  // Add more properties as needed, such as price, title, etc.
});

const orderSchema = new mongoose.Schema({
  phoneNumber: String,
  address: String,
  cartItems: [cartItemSchema], // Array of cartItem objects
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = {
  Order,
};
