// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // should already include /api
});

// ---------------- Farmer APIs ----------------
export const addProduct = (productData, config) =>
  API.post("/products", productData, config);

export const getFarmerProducts = () =>
  API.get("/products/my-products");

// ---------------- Buyer APIs ----------------
export const getAllProducts = () =>
  API.get("/products");

// ---------------- Auth APIs ----------------
export const loginUser = (credentials) =>
  API.post("/auth/login", credentials);

export const registerUser = (data) =>
  API.post("/auth/register", data);

export default API;
