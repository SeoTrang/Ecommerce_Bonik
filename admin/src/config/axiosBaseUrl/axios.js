import axios from 'axios';
import Cookies from "js-cookie";
import { accessToken } from '../../constant/constant';

const API_URL = import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL: API_URL+'/admin', // Thay thế URL của bạn tại đây
});


// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const getAccessToken = Cookies.get(accessToken);
    if (getAccessToken) {
      console.log("Access token: " + getAccessToken);
      config.headers['Authorization'] = `Bearer ${getAccessToken}`;
    }else{
      console.log("not access token");
      // const currentPath = window.location.pathname + window.location.search;
      const redirectUrl = `/login`;

      return window.location.href = redirectUrl;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default instance;
