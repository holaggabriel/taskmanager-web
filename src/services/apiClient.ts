import axios from "axios";
import { store } from "@/redux/store";
import { clearUser } from "@/redux/userSlice";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      store.dispatch(clearUser());
    }

    return Promise.reject(error);
  }
);
