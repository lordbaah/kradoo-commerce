import axios from 'axios';

const url = import.meta.env.VITE_PRODUCT_URL;

export const fetchProducts = async (
  limit: number = 30,
  skip: number = 0,
  sortBy: string = '',
  order: string = ''
) => {
  try {
    const response = await axios.get(
      `${url}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
    );
    console.log(
      'GET URL:',
      `${url}/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
    );
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const fetchProductById = async (pid: string) => {
  try {
    const response = await axios.get(`${url}/products/${pid}`);
    return response.data;
  } catch (error) {
    console.log('error', error);
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
    const response = await axios.get(
      `${url}/products/category/${category}/?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
    );
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};

export const fetchCategoryList = async () => {
  try {
    const response = await axios.get(`${url}/products/category-list`);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
