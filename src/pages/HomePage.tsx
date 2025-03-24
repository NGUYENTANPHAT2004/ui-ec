import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import CategoryCard from '../components/category/CategoryCard';
import Countdown from '../components/ui/Countdown';
import ServiceCard from '../components/ui/ServiceCard';
import { Product } from '../interface/product';


interface CategoryType {
  id: string;
  name: string;
  icon: string;
}

interface FeatureType {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

interface ServiceType {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const HomePage: React.FC = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [exploreProducts, setExploreProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [features, setFeatures] = useState<FeatureType[]>([]);
  const [services, setServices] = useState<ServiceType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // This would normally be API calls
  useEffect(() => {
    // Simulating API fetch
    setTimeout(() => {
      // Categories data
      const sampleCategories: CategoryType[] = [
        { id: 'phones', name: 'Phones', icon: '/images/categories/phone.png' },
        { id: 'computers', name: 'Computers', icon: '/images/categories/computer.png' },
        { id: 'smartwatch', name: 'SmartWatch', icon: '/images/categories/smartwatch.png' },
        { id: 'camera', name: 'Camera', icon: '/images/categories/camera.png' },
        { id: 'headphones', name: 'HeadPhones', icon: '/images/categories/headphone.png' },
        { id: 'gaming', name: 'Gaming', icon: '/images/categories/gaming.png' },
      ];
      
      // Best selling products
      const sampleBestSellingProducts: Product[] = [
        {
          id: 'the-north-coat',
          name: 'The north coat',
          price: 260,
          originalPrice: 360,
          image: '/images/products/north-coat.png',
          rating: 5,
          ratingCount: 65,
        },
        {
          id: 'gucci-bag',
          name: 'Gucci duffle bag',
          price: 960,
          originalPrice: 1160,
          image: '/images/products/gucci-bag.png',
          rating: 4.5,
          ratingCount: 65,
        },
        {
          id: 'rgb-cooler',
          name: 'RGB liquid CPU Cooler',
          price: 160,
          originalPrice: 170,
          image: '/images/products/cooler.png',
          rating: 4,
          ratingCount: 65,
        },
        {
          id: 'bookshelf',
          name: 'Small BookSelf',
          price: 360,
          image: '/images/products/bookshelf.png',
          rating: 5,
          ratingCount: 65,
        }
      ];
      
      // Explore products
      const sampleExploreProducts: Product[] = [
        {
          id: 'dog-food',
          name: 'Breed Dry Dog Food',
          price: 100,
          image: '/images/products/dog-food.png',
          rating: 5,
          ratingCount: 35,
        },
        {
          id: 'camera',
          name: 'CANON EOS DSLR Camera',
          price: 360,
          image: '/images/products/camera.png',
          rating: 4.5,
          ratingCount: 95,
        },
        {
          id: 'laptop',
          name: 'ASUS FHD Gaming Laptop',
          price: 700,
          image: '/images/products/laptop.png',
          rating: 5,
          ratingCount: 325,
        },
        {
          id: 'skincare',
          name: 'Curology Product Set',
          price: 500,
          image: '/images/products/skincare.png',
          rating: 4.5,
          ratingCount: 145,
          isNew: true,
        },
        {
          id: 'kids-car',
          name: 'Kids Electric Car',
          price: 960,
          image: '/images/products/kids-car.png',
          rating: 5,
          ratingCount: 65,
          isNew: true,
        },
        {
          id: 'cleats',
          name: 'Jr. Zoom Soccer Cleats',
          price: 1160,
          image: '/images/products/cleats.png',
          rating: 4.5,
          ratingCount: 35,
          isNew: true,
        },
        {
          id: 'gamepad',
          name: 'GP11 Shooter USB Gamepad',
          price: 660,
          image: '/images/products/gamepad.png',
          rating: 4.5,
          ratingCount: 55,
        },
        {
          id: 'jacket',
          name: 'Quilted Satin Jacket',
          price: 660,
          image: '/images/products/jacket.png',
          rating: 4.8,
          ratingCount: 55,
        }
      ];
      
      // Featured sections data
      const sampleFeatures: FeatureType[] = [
        {
          id: 'playstation',
          title: 'PlayStation 5',
          description: 'Black and White version of the PS5 coming out on sale.',
          image: '/images/features/ps5.jpg',
          buttonText: 'Shop Now',
          link: '/category/gaming'
        },
        {
          id: 'women-collection',
          title: 'Women\'s Collections',
          description: 'Featured woman collections that give you another vibe.',
          image: '/images/features/women.jpg',
          buttonText: 'Shop Now',
          link: '/category/women'
        },
        {
          id: 'speakers',
          title: 'Speakers',
          description: 'Amazon wireless speakers',
          image: '/images/features/speakers.jpg',
          buttonText: 'Shop Now',
          link: '/category/electronics'
        },
        {
          id: 'perfume',
          title: 'Perfume',
          description: 'GUCCI INTENSE OUD EDP',
          image: '/images/features/perfume.jpg',
          buttonText: 'Shop Now',
          link: '/category/beauty'
        }
      ];
      
      // Services data
      const sampleServices: ServiceType[] = [
        {
          id: 'delivery',
          title: 'FREE AND FAST DELIVERY',
          description: 'Free delivery for all orders over $140',
          icon: 'delivery-icon'
        },
        {
          id: 'customer-service',
          title: '24/7 CUSTOMER SERVICE',
          description: 'Friendly 24/7 customer support',
          icon: 'customer-service-icon'
        },
        {
          id: 'money-back',
          title: 'MONEY BACK GUARANTEE',
          description: 'We return money within 30 days',
          icon: 'money-back-icon'
        }
      ];
      
      setCategories(sampleCategories);
      setBestSellingProducts(sampleBestSellingProducts);
      setExploreProducts(sampleExploreProducts);
      setFeatures(sampleFeatures);
      setServices(sampleServices);
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
    <div>
      {/* Hero Banner */}
      <div className="bg-black py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Categories */}
            <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-8">
              <div className="bg-white p-4 rounded">
                <ul className="space-y-3">
                  <li className="font-medium text-lg mb-2">Categories</li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/woman">Woman's Fashion</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/men">Men's Fashion</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/electronics">Electronics</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/home">Home & Lifestyle</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/medicine">Medicine</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/sports">Sports & Outdoor</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/baby">Baby's & Toys</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/groceries">Groceries & Pets</Link>
                  </li>
                  <li className="hover:text-red-500 transition-colors">
                    <Link to="/category/health">Health & Beauty</Link>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Right side - Promo Banner */}
            <div className="w-full md:w-3/4">
              <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded p-8 md:p-12 h-full flex flex-col justify-center">
                <div className="max-w-lg">
                  <div className="flex items-center mb-4">
                    <img src="/images/apple-logo.png" alt="Apple Logo" className="h-10 mr-3" />
                    <span className="text-lg">iPhone 14 Series</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Up to 10% off Voucher
                  </h1>
                  <div className="flex space-x-2 items-center mb-6">
                    <Link 
                      to="/products/iphone" 
                      className="flex items-center text-lg hover:underline"
                    >
                      <span>Shop Now</span>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="/images/hero_endframe__cvklg0xk3w6e_large 2.png">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Flash Sale & Time Counter */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Enhance Your Music Experience</h2>
            <div className="flex space-x-8 mt-4">
              <Countdown days={5} hours={23} minutes={59} seconds={35} />
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link 
              to="/flash-sale" 
              className="inline-block px-8 py-3 bg-red-500 text-white rounded transition-colors hover:bg-red-600"
            >
              Buy Now!
            </Link>
          </div>
        </div>
        {/* <img src="/images/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png" alt="" /> */}
      </div>
      
      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-5 h-10 bg-red-500 mr-3"></div>
            <h2 className="text-lg">Categories</h2>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Browse By Category</h2>
            <div className="flex space-x-2">
              <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Best Selling Products */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-5 h-10 bg-red-500 mr-3"></div>
            <h2 className="text-lg">This Month</h2>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Best Selling Products</h2>
            <Link 
              to="/best-selling" 
              className="inline-block px-6 py-2 bg-red-500 text-white rounded transition-colors hover:bg-red-600"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Our Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-5 h-10 bg-red-500 mr-3"></div>
            <h2 className="text-lg">Our Products</h2>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Explore Our Products</h2>
            <div className="flex space-x-2">
              <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="p-2 border rounded-full hover:bg-gray-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {exploreProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link 
              to="/products" 
              className="inline-block px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </div>
      
      {/* Featured Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <div className="w-5 h-10 bg-red-500 mr-3"></div>
            <h2 className="text-lg">Featured</h2>
          </div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">New Arrival</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.id} 
                className={`bg-black text-white rounded overflow-hidden ${
                  index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                }`}
              >
                <div className="p-6 flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-300 mb-4">{feature.description}</p>
                  </div>
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-white hover:underline"
                  >
                    {feature.buttonText}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="container mx-auto px-4 py-16 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;