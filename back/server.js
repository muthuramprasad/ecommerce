const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');





const app = express();
const port = process.env.PORT || 3001;

app.use(cors()); // Adjust the payload limit as needed
app.use(express.json({ limit: '10mb' })); // Adjust the payload limit as needed


mongoose.connect('mongodb://localhost:27017/Products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// mongoose.connect('mongodb+srv://Products:Products@cluster0.amngytv.mongodb.net/YourDatabaseName', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });


const jwtSecretKey = process.env.JWT_SECRET_KEY || 'your_secret_key';
const refreshSecretKey = process.env.REFRESH_SECRET_KEY || 'your_refresh_secret_key';

function generateToken(payload, expiresIn) {
    return jwt.sign(payload, jwtSecretKey, { expiresIn });
}

function generateRefreshToken(payload, expiresIn) {
    return jwt.sign(payload, refreshSecretKey, { expiresIn });
}



const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fieldSize: 1000 * 1024 * 1024 } // Adjust the limit as needed
});


const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  brand: String,
  category: String,
  images: [String], // Change the images type to String (Base64)
  colors: String,
  old_price: Number,
  price: Number,
  createdAt: { type: Date, default: Date.now } // Add a timestamp field
});


const Product = mongoose.model('Product', productSchema);

app.get('/api/get-products', async (req, res) => {
  try {
    const products = await Product.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (new to old)
      .exec();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/api/get-product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/add-product', upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
]), async (req, res) => {
  try {
    console.log('Received data:', req.body);
    console.log('Received files:', req.files);

    const { title, description, brand, category, colors, old_price, price, productId } = req.body;
    const images = [];

    for (let i = 1; i <= 3; i++) {
      if (req.files[`image${i}`]) {
        const buffer = req.files[`image${i}`][0].buffer;
        const base64Image = buffer.toString('base64');
        images.push(base64Image);
      }
    }

    if (productId) {
      // If productId is provided, update the existing product
      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ error: 'Product not found' });
      }

      existingProduct.title = title;
      existingProduct.description = description;
      existingProduct.brand = brand;
      existingProduct.category = category;
      existingProduct.images = images;
      existingProduct.colors = colors;
      existingProduct.old_price = old_price;
      existingProduct.price = price;

      await existingProduct.save();

      res.status(200).json({ message: 'Product updated successfully' });
    } else {
      // If productId is not provided, add a new product
      const newProduct = new Product({
        title,
        description,
        brand,
        category,
        images,
        colors,
        old_price,
        price,
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product added successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/delete-product/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
const userSchema = new mongoose.Schema({
  name:  String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email or name already exists
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByName = await User.findOne({ name });

    if (existingUserByEmail) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    if (existingUserByName) {
      return res.status(400).json({ error: 'Name already exists' });
    }

    // Hash the password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
    });

    await newUser.save();
 // Generate a token with 30 seconds expiration
 const accessToken = generateToken({ name, email }, '30s');

 // Generate a refresh token with 30 seconds expiration
 const refreshToken = generateRefreshToken({ name, email }, '30s');

 res.status(201).json({ message: 'User registered successfully', accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a token
  // Generate a token with 30 seconds expiration
  const accessToken = generateToken({ email }, '30s');

  // Generate a refresh token with 30 seconds expiration
  const refreshToken = generateRefreshToken({ email }, '30s');

  res.status(200).json({ message: 'Sign-in successful', accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// server.js
// Define the order schema and model
const orderSchema = new mongoose.Schema({
  products: [{
    title: String,
    image: String,
    description: String,
    size: String,
    totalQuantity: Number,
    totalCost: Number,
    brand: String,
    colors: String,
    category: String,
  }],
  info: {
    phoneNumber: String,
    address: String,
  },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// ... (Other routes and middleware)


app.get('/api/get-orders', async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (new to old)
      .exec();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// Route for placing orders
app.post('/api/place-order', async (req, res) => {
  try {
    const { phoneNumber, address, products } = req.body;
    console.log('Received order data:', req.body);

    const order = new Order({
      products,
      info: {
        phoneNumber,
        address,
      },
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add this route in your server code
app.delete('/api/delete-order/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});