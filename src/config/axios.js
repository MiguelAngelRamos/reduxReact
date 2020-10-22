import axios from 'axios';

const clienteAxios = axios.create({
  baseURL: 'http://localhost:8010/api'
});

export default clienteAxios;