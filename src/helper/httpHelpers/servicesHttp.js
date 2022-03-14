/* eslint-disable import/prefer-default-export */
import axiosInstance from '../../config/axiosConfig';

const axios = axiosInstance;

export const getServices = async (token) => {
  try {
    const response = await axios.get(`/readService/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
