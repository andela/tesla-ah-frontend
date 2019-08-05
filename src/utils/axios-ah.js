/* eslint-disable no-undef */
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_URL,
  headers: { token: localStorage.getItem('ACCESS_TOKEN') },
});

export default instance;
