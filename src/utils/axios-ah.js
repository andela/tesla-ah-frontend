/* eslint-disable no-undef */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: { token: sessionStorage.getItem('token') },
});

export default instance;
