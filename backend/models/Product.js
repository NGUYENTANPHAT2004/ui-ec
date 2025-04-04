const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [1000, 'Price must be greater than 1000']
  },
  image: {
    type: String,
    required: [true, 'Product image is required']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model already exists
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;