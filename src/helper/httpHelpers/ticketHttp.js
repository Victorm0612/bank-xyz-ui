import axiosInstance from '../../config/axiosConfig';

const axios = axiosInstance;

export const generateNewTicket = async (serviceSelected, docNumber, token) => {
  try {
    const response = await axios.post(
      `/createTicket/`,
      {
        serviceType: serviceSelected,
        docNumber
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const updateTicket = async (token, body) => {
  try {
    const response = await axios.put(
      'updateTicket/',
      {
        arrivalDate: body.arrivalDate,
        arrivalTime: body.arrivalTime,
        id: body.id,
        orderNumber: body.orderNumber,
        serviceId_id: body.serviceId_id,
        state: 1,
        userId_id: body.userId_id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getAllLine = async (token) => {
  try {
    const response = await axios.get('getLine/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getNextTurn = async (token, type) => {
  try {
    const response = await axios.get(`getNextTurn/${type}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
