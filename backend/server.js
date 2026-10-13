
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  {
    name: 'Nova X Smartphone',
    category: 'Smartphones',
    price: 24999,
    rating: 4.5,
    description: 'AMOLED display, 128GB storage, 50MP camera'
  },
  {
    name: 'PixelPro Smartphone',
    category: 'Smartphones',
    price: 29999,
    rating: 4.7,
    description: 'OLED display, 256GB storage, 64MP camera'
  },
  {
    name: 'Sonic Wireless Headphones',
    category: 'Headphones',
    price: 3999,
    rating: 4.3,
    description: 'Wireless audio, noise reduction, 30-hour battery'
  }
];

app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().lean();

    res.json(
      products.map(({ _id, ...product }) => ({
        ...product,
        id: _id.toString()
      }))
    );
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ message: 'Could not fetch products' });
  }
});

async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from your .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    const productCount = await Product.countDocuments();

    if (productCount === 0) {
      await Product.insertMany(sampleProducts);
      console.log('Sample products added to MongoDB');
    }

    app.listen(PORT, () => {
      console.log(`ShopSmart backend running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Backend startup failed:', error.message);
    process.exit(1);
  }
}

startServer();
