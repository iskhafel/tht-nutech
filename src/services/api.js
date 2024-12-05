import axios from "axios";

const api = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (data) => {
  try {
    const response = await api.post("/registration", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/login", data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error("Network Error");
  }
};

// Function to fetch user data
export const fetchUser = async (token) => {
  const response = await api.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

// Function to fetch banners
export const fetchBanner = async (token) => {
  const response = await api.get("/banner", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

// Function to fetch services
export const fetchServices = async (token) => {
  const response = await api.get("/services", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

// Function to fetch balance
export const fetchBalance = async (token) => {
  const response = await api.get("/balance", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

// Function to topup user balance
export const topupBalance = async (token) => {
  const response = await api.post("/top-up", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};
