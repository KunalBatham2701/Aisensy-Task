import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts';

export const getContacts = async (page, limit) => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
  }
};