import axios from "axios";

const API = axios.create({
  baseURL: "https://blog-appvkp.vercel.app/p/api", // backend URL
  withCredentials: true, // allow cookies if using JWT in cookies
});

export default API;
