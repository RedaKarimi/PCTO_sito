import axios from "axios";

const BASE_URL = "http://192.168.250.52:8000/api/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";