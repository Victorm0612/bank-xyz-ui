import axios from 'axios';
import enviroments from '../enviroments';

const axiosInstance = axios.create({
  baseURL: enviroments.apiUrl,
  headers: {
    'x-mock-response-code': 200
  }
});

export default axiosInstance;
