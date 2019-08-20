/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-undef */
import axios from 'axios';
import { BACKEND_URL } from './constants';


const { NODE_ENV } = process.env;
const token = sessionStorage.setItem('ACCESS_TOKEN') || null;

export default NODE_ENV === 'test' ? axios : axios.create({
  baseURL: BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});
