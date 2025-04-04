import axios, { AxiosError, AxiosResponse } from 'axios';
import { Product, Category, User, AuthResponse, ErrorResponse } from '../interface/product';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    // Log out user if token is invalid or expired
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

// Helper to transform backend product to frontend format
const transformProduct = (product: any): Product => {
  if (!product) return {} as Product;
  
  return {
    id: product._id,
    _id: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    category: product.category,
    description: product.description,
    // Add any other fields that need transformation
    createdAt: product.createdAt,
  };
};

// Helper to transform backend category to frontend format
const transformCategory = (category: any): Category => {
  if (!category) return {} as Category;
  
  return {
    id: category._id,
    _id: category._id,
    name: category.name,
    // Map any other fields
    createdAt: category.createdAt,
  };
};

export const authService = {
  register: async (userData: { name: string; email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/register', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { error: 'Registration failed' };
    }
  },

  login: async (credentials: { email: string; password: string }): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      throw axiosError.response?.data || { error: 'Login failed' };
    }
  },

  logout: (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr) as User;
    } catch {
      return null;
    }
  },

  validateToken: async (): Promise<User | null> => {
    try {
      const response = await api.get<User>('/auth/me');
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch {
      // Remove invalid token
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
  },

  isAdmin: (): boolean => {
    const user = authService.getCurrentUser();
    return user?.role === 'admin';
  }
};

export const categoryService = {
  getAll: async (): Promise<AxiosResponse<Category[]>> => {
    try {
      const response = await api.get<Category[]>('/categories');
      // Transform backend data to frontend format if needed
      response.data = response.data.map(transformCategory);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id: string): Promise<Category> => {
    try {
      const response = await api.get<Category>(`/categories/${id}`);
      return transformCategory(response.data);
    } catch (error) {
      throw error;
    }
  },
  
  create: async (data: { name: string }): Promise<AxiosResponse<Category>> => {
    try {
      const response = await api.post<Category>('/categories', data);
      response.data = transformCategory(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (id: string, data: { name: string }): Promise<AxiosResponse<Category>> => {
    try {
      const response = await api.put<Category>(`/categories/${id}`, data);
      response.data = transformCategory(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      throw error;
    }
  }
};

export const productService = {
  getAll: async (): Promise<AxiosResponse<Product[]>> => {
    try {
      const response = await api.get<Product[]>('/products');
      // Transform the data to match frontend expectations
      response.data = response.data.map(transformProduct);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  getById: async (id: string): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return transformProduct(response.data);
    } catch (error) {
      throw error;
    }
  },
  
  create: async (data: { 
    name: string; 
    price: number; 
    image: string; 
    category: string;
    description?: string;
  }): Promise<AxiosResponse<Product>> => {
    try {
      const response = await api.post<Product>('/products', data);
      response.data = transformProduct(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  update: async (id: string, data: { 
    name: string; 
    price: number; 
    image: string; 
    category: string;
    description?: string;
  }): Promise<AxiosResponse<Product>> => {
    try {
      const response = await api.put<Product>(`/products/${id}`, data);
      response.data = transformProduct(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      throw error;
    }
  },
  
  // Add any additional methods needed for your frontend
  getByCategoryId: async (categoryId: string): Promise<Product[]> => {
    try {
      const response = await api.get<Product[]>(`/products/category/${categoryId}`);
      return response.data.map(transformProduct);
    } catch (error) {
      throw error;
    }
  },
  
  getBestSellers: async (): Promise<Product[]> => {
    // This would need to be implemented on the backend
    // For now, we'll just get all products as a placeholder
    try {
      const response = await api.get<Product[]>('/products');
      return response.data.map(transformProduct);
    } catch (error) {
      throw error;
    }
  },
  
  getNewArrivals: async (): Promise<Product[]> => {
    // This would need to be implemented on the backend
    // For now, we'll just get all products as a placeholder
    try {
      const response = await api.get<Product[]>('/products');
      return response.data.map(transformProduct);
    } catch (error) {
      throw error;
    }
  }
};

export const adminService = {
  getDashboardData: async () => {
    try {
      const response = await api.get('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;