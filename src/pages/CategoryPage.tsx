import React, { useState, useEffect } from 'react';
import ProductGrid from '../components/product/ProductGrid';
import { Product } from '../interface/product';

const CategoryPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    
    // This would normally be a real API call
    useEffect(() => {
      // Simulating API fetch
      setTimeout(() => {
        // Sample products data
        const sampleProducts: Product[] = [
          {
            id: 'gucci-bag',
            name: 'Gucci duffle bag',
            price: 960,
            originalPrice: 1160,
            image: '/images/products/gucci-bag.jpg',
            discount: 35,
          },
          {
            id: 'rgb-cooler',
            name: 'RGB liquid CPU Cooler',
            price: 1960,
            image: '/images/products/cooler.jpg',
          },
          {
            id: 'gp11-gamepad',
            name: 'GP11 Shooter USB Gamepad',
            price: 550,
            image: '/images/products/gamepad-black.jpg',
          },
          {
            id: 'jacket',
            name: 'Quilted Satin Jacket',
            price: 750,
            image: '/images/products/jacket.jpg',
          },
          {
            id: 'gaming-laptop',
            name: 'ASUS FHD Gaming Laptop',
            price: 960,
            originalPrice: 1160,
            image: '/images/products/laptop.jpg',
            rating: 5,
            ratingCount: 65,
            discount: 35,
          },
          {
            id: 'gaming-monitor',
            name: 'IPS LCD Gaming Monitor',
            price: 1160,
            image: '/images/products/monitor.jpg',
            rating: 5,
            ratingCount: 65,
          },
          {
            id: 'gamepad-red',
            name: 'HAVIT HV-G92 Gamepad',
            price: 560,
            image: '/images/products/gamepad-red.jpg',
            rating: 5,
            ratingCount: 65,
            isNew: true,
          },
          {
            id: 'keyboard',
            name: 'AK-900 Wired Keyboard',
            price: 200,
            image: '/images/products/keyboard.jpg',
            rating: 5,
            ratingCount: 65,
          },
        ];
        
        setProducts(sampleProducts);
        setLoading(false);
      }, 500);
    }, []);
    
    if (loading) {
      return (
        <div className="container mx-auto px-4 py-12 text-center">
          <p>Loading products...</p>
        </div>
      );
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Category name</h1>
        <ProductGrid products={products} />
        
        {/* Pagination */}
        <div className="flex justify-center mt-12 mb-8">
          <p className="text-center">Phân trang</p>
        </div>
      </div>
    );
  };
  
  export default CategoryPage;