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

export const createUser = async (token, body) => {
  try {
    const response = await axios.post('createUser/', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getAllUsers = async (token) => {
  try {
    const response = await axios.get(`/readUser/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const updateUser = async (token, body) => {
  try {
    const response = await axios.put('updateUser/', body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const deleteUser = async (token, id) => {
  try {
    const response = await axios.delete(`deleteUser/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
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
