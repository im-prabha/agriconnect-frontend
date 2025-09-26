// src/utils/auth.js

// Save token for a specific role
export const setTokenForRole = (role, token) => {
  if (role === "farmer") {
    localStorage.setItem("farmerToken", token);
  } else if (role === "buyer") {
    localStorage.setItem("buyerToken", token);
  }
};

// Get Authorization header for a specific role
export const authHeaderForRole = (role) => {
  const token =
    role === "farmer"
      ? localStorage.getItem("farmerToken")
      : localStorage.getItem("buyerToken");

  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Clear token for logout
export const clearTokenForRole = (role) => {
  if (role === "farmer") {
    localStorage.removeItem("farmerToken");
  } else if (role === "buyer") {
    localStorage.removeItem("buyerToken");
  }
};
