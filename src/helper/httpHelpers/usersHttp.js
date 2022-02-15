/* eslint-disable import/prefer-default-export */
import axiosInstance from '../../config/axiosConfig';

const axios = axiosInstance;

export const loginUser = async (code) => {
  try {
    const response = await axios.get(`/login/${code}`);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
