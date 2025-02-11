import axios from "axios";

export const axiosInstance = axios.create({
  baseURL : 'http://localhost:3000/api',
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
    'User-ID' : '42499b0b-93aa-46db-b331-3c79fc16d8f8',
  }
})