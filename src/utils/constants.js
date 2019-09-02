export const BASE_URL = 'http://localhost:3000';
export const FRONTEND_URL = 'https://tesla-ah-frontend.herokuapp.com';
export const BACKEND_URL = 'https://tesla-ah-staging.herokuapp.com';
export const API_URL = 'https://tesla-ah-staging.herokuapp.com/api';
export const DEFAULT_AVATA = 'https://i.stack.imgur.com/l60Hf.png';
export const STORAGE_BASE_URL = 'https://api.cloudinary.com/v1_1/newpoint/upload';
export const IMAGE_STORAGE_PRESENTS = 'iiyeav82';
export const HEADER_CONFIG = {
  headers: {
    'Content-Type': 'application/json',
    token: `${sessionStorage.getItem('token')}`,
  },
};

export const LOCAL_SOCKET_SERVER = 'http://localhost:3000';
export const REMOTE_SOCKET_SERVER = 'https://tesla-ah-staging.herokuapp.com';
