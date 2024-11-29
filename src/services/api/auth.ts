import { apiClient } from "../root";

export const loginApi = async (data: LoginFormProps) => {
  const response = await apiClient.post("/login", data);
  return response.data;
};
