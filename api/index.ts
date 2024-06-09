import axios from "axios";
import * as SecureStore from "expo-secure-store";

// Create an instance of axios
const api = axios.create({
  baseURL: "",
  timeout: 20000,
});

// Add a request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get the token from Secure Store
    const token = await SecureStore.getItemAsync("refreshtoken");

    // If the token is present, set it on the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
