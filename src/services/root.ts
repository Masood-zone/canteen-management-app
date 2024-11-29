import axios from "axios";
const token = localStorage.getItem("token");

export const apiClient = axios.create({
  baseURL: "http://localhost:3400",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
