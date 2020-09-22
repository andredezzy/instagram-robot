import axios from 'axios';

const api = axios.create({
  baseURL: 'https://apiatena.glaros.com.br/api',
});

export default api;
