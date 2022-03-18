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

export const getLocationById = async (token, locationId) => {
  try {
    const response = await axios.get(`readLocation/${locationId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data[0];
  } catch (error) {
    throw error.message;
  }
};

export const createLocation = async (token, name) => {
  try {
    const response = await axios.post(
      'createLocation/',
      {
        name
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

export const updateOldLocation = async (token, body) => {
  try {
    const response = await axios.put('updateLocation/', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const deleteLocation = async (token, id) => {
  try {
    const response = await axios.delete(`deleteLocation/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
