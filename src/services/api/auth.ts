import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3400",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginApi = async (data: LoginFormProps) => {
  const response = await apiClient.post("/login", data);
  return response.data;
};
