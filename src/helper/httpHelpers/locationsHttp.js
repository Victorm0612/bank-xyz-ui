/* eslint-disable import/prefer-default-export */
import axiosInstance from '../../config/axiosConfig';

const axios = axiosInstance;

export const getLocations = async (token) => {
  try {
    const response = await axios.get('/readLocation/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
