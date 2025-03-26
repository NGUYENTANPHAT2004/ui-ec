import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../interface/product';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const {
    name,
    price,
    description = '',
    images = ['/images/products/image-63.png', '/images/products/image-58.png', "/images/products/image-61.png", "/images/products/image-59.png"],
    colors,
    sizes,
    rating = 0,
    reviewCount = 0,
    inStock = true
  } = product;
  const [selectedImage, setSelectedImage] = useState<string>(images?.[0] || '');
  const incrementQuantity = (): void => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = (): void => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Images */}
        <div className="md:w-1/2">
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-2 mt-4 md:mt-0 items-center">
              {images.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 border rounded cursor-pointer p-1 ${selectedImage === img ? 'border-blue-500' : 'border-gray-300'
                    }`}
                >
                  <img
                    src={img}
                    alt={`${name} ${index + 1}`}
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 bg-gray-100 aspect-square rounded flex items-center justify-center">
              <img
                src={selectedImage}
                alt={name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        </div>


        {/* Product Info */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold">{name}</h1>

          {/* Rating */}
          <div className="flex items-center mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">({reviewCount} Reviews)</span>
            {inStock ? (
              <span className="ml-4 text-green-500 text-sm">In Stock</span>
            ) : (
              <span className="ml-4 text-red-500 text-sm">Out of Stock</span>
            )}
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-2xl font-bold">${price}</span>
          </div>

          {/* Description */}
          {description && (
            <div className="mt-4">
              <p className="text-gray-700">{description}</p>
            </div>
          )}

          <div className="border-t border-gray-200 my-6"></div>

          {/* Color Selection */}
          {colors && colors.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Colours:</h3>
              <div className="flex space-x-3 mt-2">
                {colors.map((color, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full ${selectedColor === color.value ? 'ring-2 ring-offset-1 ring-black' : ''}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.value)}
                    aria-label={color.name}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {sizes && sizes.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium">Size:</h3>
              <div className="flex space-x-3 mt-2">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`w-8 h-8 border flex items-center justify-center text-sm ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'
                      }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center border border-gray-300">
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={decrementQuantity}
                type="button"
              >
                -
              </button>
              <span className="px-3 py-2 text-center w-10">{quantity}</span>
              <button
                className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                onClick={incrementQuantity}
                type="button"
              >
                +
              </button>
            </div>

            <button
              className="px-6 py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
              type="button"
            >
              Buy Now
            </button>

            <button
              className="p-2 border border-gray-300 hover:bg-gray-100"
              type="button"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;