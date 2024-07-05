import axios from 'axios';

const API_URL = 'https://luisedoh1-001-site1.etempurl.com/products'; 
const API_URL2 = 'https://luisedoh1-001-site1.etempurl.com/categories';
const API_URL3 = 'https://luisedoh1-001-site1.etempurl.com/Caracteristica';
const API_URL4 = 'https://luisedoh1-001-site1.etempurl.com/Products/masvendidos';

export const fetchProducts = async (orderBy = '', orderType = '') => {
    const params = {};
    if (orderBy) params.orderBy = orderBy;
    if (orderType) params.orderType = orderType;

    const response = await axios.get(API_URL, { params });
    return response.data;
};
export const fetchPopularProducts = async () => {
    try {
        const response = await axios.get(API_URL4);
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

export const fetchCharacteristics = async ()=>{
    try {
        const response = await axios.get(API_URL3);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }

}
