// Product types
export interface Product {
  id?: string;
  _id?: string; // MongoDB ID from backend
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
  // Support both string ID and Category object from populated queries
  category?: string | Category | { _id: string; name: string };
  tags?: string[];
  sku?: string;
  brand?: string;
  createdAt?: string | Date;
}

// Category types
export interface Category {
  id?: string;
  _id?: string; // MongoDB ID from backend
  name: string;
  icon?: string;
  subcategories?: Category[];
  createdAt?: string | Date;
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
  id?: string;
  _id?: string; // MongoDB ID from backend
  name: string;
  email: string;
  role?: 'user' | 'admin';
  avatar?: string;
  createdAt?: string | Date;
}

// JWT Authentication Response
export interface AuthResponse {
  user: User;
  token: string;
}

// Order types
export interface Order {
  id?: string;
  _id?: string; // MongoDB ID from backend
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
  createdAt: string | Date;
}

// Address types
export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Error Response type
export interface ErrorResponse {
  error: string;
  status?: number;
}