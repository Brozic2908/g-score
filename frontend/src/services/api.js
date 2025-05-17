import axios from "axios";

const API_URL = "https://g-scores-server-production.up.railway.app/api/";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axios.defaults.withCredentials = true;

export default api;
