import axios, { AxiosError } from 'axios';

const url = import.meta.env.VITE_PRODUCT_URL;

// Create axios instance with default config
const api = axios.create({
  baseURL: url,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.code === 'ECONNABORTED') {
      throw new Error(
        'Request timeout. Please check your connection and try again.'
      );
    }

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      switch (status) {
        case 404:
          throw new Error('The requested resource was not found.');
        case 500:
          throw new Error('Server error. Please try again later.');
        case 503:
          throw new Error('Service unavailable. Please try again later.');
        default:
          throw new Error(`Server error (${status}). Please try again.`);
      }
    } else if (error.request) {
      // Network error
      throw new Error('Network error. Please check your connection.');
    } else {
      // Other error
      throw new Error('An unexpected error occurred.');
    }
  }
);

export interface FetchProductsParams {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: string;
  category?: string;
}

export const fetchProducts = async (
  limit: number = 30,
  skip: number = 0,
  sortBy: string = '',
  order: string = ''
) => {
  try {
    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (skip) params.append('skip', skip.toString());
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);

    const response = await api.get(`/products?${params.toString()}`);

    // Validate response structure
    if (!response.data) {
      throw new Error('Invalid response format');
    }

    return {
      products: response.data.products || [],
      total: response.data.total || 0,
      skip: response.data.skip || 0,
      limit: response.data.limit || limit,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (pid: string) => {
  try {
    if (!pid) {
      throw new Error('Product ID is required');
    }

    const response = await api.get(`/products/${pid}`);

    if (!response.data) {
      throw new Error('Product not found');
    }

    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${pid}:`, error);
    throw error;
  }
};

export const fetchProductsByCategory = async (
  category: string,
  limit: number = 10,
  skip: number = 0,
  sortBy: string = '',
  order: string = ''
) => {
  try {
    if (!category) {
      throw new Error('Category is required');
    }

    const params = new URLSearchParams();

    if (limit) params.append('limit', limit.toString());
    if (skip) params.append('skip', skip.toString());
    if (sortBy) params.append('sortBy', sortBy);
    if (order) params.append('order', order);

    const response = await api.get(
      `/products/category/${category}?${params.toString()}`
    );

    if (!response.data) {
      throw new Error('Invalid response format');
    }

    return {
      products: response.data.products || [],
      total: response.data.total || 0,
      skip: response.data.skip || 0,
      limit: response.data.limit || limit,
      category: category,
    };
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw error;
  }
};

// Additional utility functions
export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const searchProducts = async (
  query: string,
  limit: number = 20,
  skip: number = 0
) => {
  try {
    if (!query.trim()) {
      throw new Error('Search query is required');
    }

    const params = new URLSearchParams({
      q: query.trim(),
      limit: limit.toString(),
      skip: skip.toString(),
    });

    const response = await api.get(`/products/search?${params.toString()}`);

    return {
      products: response.data.products || [],
      total: response.data.total || 0,
      query: query,
    };
  } catch (error) {
    console.error(`Error searching products for "${query}":`, error);
    throw error;
  }
};
