// These should be added to your interface/product.ts file:

export interface Product {
  _id: string;
  id?: string; // For compatibility with both backend and frontend
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: string | Category;
  countInStock: number;
  rating: number;
  numReviews: number;
  discount?: number;
  originalPrice?: number;
  ratingCount?: number;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  id?: string; // For compatibility with both backend and frontend
  name: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
  message?: string;
}