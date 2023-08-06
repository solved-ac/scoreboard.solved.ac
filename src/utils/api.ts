import axios from "axios";

const acAxios = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  withCredentials: true,
});

export default acAxios;
