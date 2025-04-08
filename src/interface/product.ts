// These should be added to your interface/product.ts file:

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
  category: string | Category;
  countInStock: number;
  rating: number;
  numReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ErrorResponse {
  error: string;
}