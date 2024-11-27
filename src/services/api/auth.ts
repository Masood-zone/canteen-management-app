import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3400",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (data) => {
  const response = await apiClient.post("/auth/login", data);
  return response.data;
};
