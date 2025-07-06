// utils/api.ts
import axios from "axios";
import { getAccessToken } from "./authStorage";

const API = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Replace with your backend URL
});

console.log(process.env.EXPO_PUBLIC_API_URL, "API URL");

API.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.request.use(async (config: any) => {
  console.log("🚀 Requesting:", config.baseURL + config.url);
  return config;
});

axios.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.log("Axios error response:", error.response);
    console.log("Axios full error:", JSON.stringify(error, null, 2));
    return Promise.reject(error);
  }
);

export default API;
