import React, { useState, useEffect } from 'react';
import { productService, categoryService } from '../../services/api';
import { Product } from '../../interface/product';

interface Category {
  _id: string;
  name: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
    category: ''
  });
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products');
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAll();
      setCategories(response.data);
    } catch (error) {
      setError('Failed to fetch categories');
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      setError('Product name cannot be empty');
      return;
    }
    if (Number(newProduct.price) <= 1000) {
      setError('Price must be greater than 1000');
      return;
    }

    try {
      const response = await productService.create({
        ...newProduct,
        price: Number(newProduct.price)
      });
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        price: '',
        image: '',
        category: ''
      });
      setError('');
    } catch (error) {
      setError('Failed to create product');
      console.error(error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    if (!editingProduct.name.trim()) {
      setError('Product name cannot be empty');
      return;
    }
    if (editingProduct.price <= 1000) {
      setError('Price must be greater than 1000');
      return;
    }

    const productId = editingProduct._id || editingProduct.id;
    if (!productId) {
      setError('Product ID is missing');
      return;
    }

    try {
      const response = await productService.update(productId, {
        name: editingProduct.name,
        price: editingProduct.price,
        image: editingProduct.image,
        category: editingProduct.category?._id || editingProduct.category
      });
      
      setProducts(products.map(prod => 
        (prod._id === productId || prod.id === productId) ? response.data : prod
      ));
      setEditingProduct(null);
      setError('');
    } catch (error) {
      setError('Failed to update product');
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await productService.delete(id);
      setProducts(products.filter(prod => (prod._id !== id && prod.id !== id)));
    } catch (error) {
      setError('Failed to delete product');
      console.error(error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Product Form */}
      <form onSubmit={handleCreate} className="mb-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            placeholder="Product name"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            placeholder="Price"
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            placeholder="Image URL"
            className="p-2 border rounded"
          />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
            className="p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>

      {/* Products List */}
      <div className="space-y-4">
        {products.map(product => {
          const productId = product._id || product.id;
          return (
            <div key={productId} className="border rounded p-4">
              {editingProduct && (editingProduct._id === productId || editingProduct.id === productId) ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={editingProduct.name}
                      onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                      className="p-2 border rounded"
                    />
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) => setEditingProduct({...editingProduct, price: Number(e.target.value)})}
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      value={editingProduct.image}
                      onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                      className="p-2 border rounded"
                    />
                    <select
                      value={editingProduct.category?._id || editingProduct.category}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        category: categories.find(cat => cat._id === e.target.value) || e.target.value
                      })}
                      className="p-2 border rounded"
                    >
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="font-bold">{product.name}</div>
                    <div>Price: ${product.price}</div>
                    <div>Category: {product.category?.name || 'Uncategorized'}</div>
                    <img src={product.image} alt={product.name} className="w-20 h-20 object-cover mt-2" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(productId)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;