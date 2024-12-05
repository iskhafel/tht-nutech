import axios from "axios";

const api = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
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
