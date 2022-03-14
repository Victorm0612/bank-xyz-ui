import axios from 'axios';
import enviroments from '../enviroments';

const axiosInstance = axios.create({
  baseURL: enviroments.apiUrl
});

export default axiosInstance;
