import axios from 'axios';

const api = axios.create({
  baseURL: 'https://improved-computing-machine-69r6x6jv5v4jhq7w-5000.app.github.dev', 
});

api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url, 'with data:', config.data);
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.message);
    return Promise.reject(error);
  }
);

export default api;