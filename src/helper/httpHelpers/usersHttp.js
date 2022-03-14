import axiosInstance from '../../config/axiosConfig';

const axios = axiosInstance;

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post('/login/', {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getUserById = async (token, docNumber) => {
  try {
    const response = await axios.get(`/readUser/${docNumber}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
