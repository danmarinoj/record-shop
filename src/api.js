import axios from 'axios';

const api = axios.create({
  baseURL: 'https://doubledsrecords.com:3002', // 127.0.0.1
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here' // Optional: for authenticated requests
  }
});

export default api;
