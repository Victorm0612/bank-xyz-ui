/* eslint-disable import/prefer-default-export */
import axiosInstance from '../../config/axiosConfig';

const axios = axiosInstance;

export const generateNewTicket = async (serviceSelected, token) => {
  try {
    const response = await axios.get(`/generateTicket/:${serviceSelected}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
