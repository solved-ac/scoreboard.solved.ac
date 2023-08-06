import axios from "axios";

const acAxios = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  withCredentials: true,
});

export default acAxios;
