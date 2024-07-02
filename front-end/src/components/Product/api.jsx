import axios from 'axios';

const API_URL = 'https://localhost:7105/products'; 
const API_URL2 = 'https://localhost:7105/categories/';

export const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const fetchCategories = async ()=>{
    try {
        const response = await axios.get(API_URL2);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

}