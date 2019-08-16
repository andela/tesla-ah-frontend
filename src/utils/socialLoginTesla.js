/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-undef */
import axios from 'axios';

const { NODE_ENV } = process.env;
const token = localStorage.getItem('ACCESS_TOKEN') || null;

export default NODE_ENV === 'test' ? axios : axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
