import axios from 'axios';
import {BASE_BACKEND_URL} from '@env';
export const axiosObj = axios.create({
  // baseURL: "http://localhost:5000/api/v1",
  // baseURL: "http://localhost:5000/api/v1",

  baseURL: `${BASE_BACKEND_URL}`,
});
