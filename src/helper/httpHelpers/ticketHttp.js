import axiosInstance from '../../config/axiosConfig';

const axios = axiosInstance;

export const generateNewTicket = async (
  serviceSelected,
  docNumber,
  locationId,
  token
) => {
  try {
    const response = await axios.post(
      `/createTicket/`,
      {
        serviceType: serviceSelected,
        docNumber,
        locationId
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
        state: 2,
        userId_id: body.userId_id,
        locationId: body.locationId
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

export const getAllLine = async (token, locationId) => {
  try {
    const response = await axios.get(`getLine/${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getNextTurn = async (token, type, locationId) => {
  try {
    const response = await axios.get(`getNextTurn/${type}/${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
