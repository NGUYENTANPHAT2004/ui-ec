// Product types
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  description?: string;
  discount?: number;
  isNew?: boolean;
  rating?: number;
  ratingCount?: number;
  reviewCount?: number;
  inStock?: boolean;
  colors?: Array<{ name: string; value: string }>;
  sizes?: string[];
  category?: string;
  tags?: string[];
  sku?: string;
  brand?: string;
}

// Category types
export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: Category[];
}

// Feature types
export interface Feature {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  link: string;
}

// Service types
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// User types
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

// Order types
export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  paymentMethod: string;
  createdAt: string;
}

// Address types
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}