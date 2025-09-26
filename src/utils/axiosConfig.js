const API_URL = import.meta.env.VITE_API_URL;

// Example with axios:
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // only if you’re using cookies/sessions
});

export default api;
