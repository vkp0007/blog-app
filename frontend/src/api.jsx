import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // backend URL
  withCredentials: true, // allow cookies if using JWT in cookies
});

export default API;
