import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL:"https://ai-powered-finance-tracker-1-b50f.onrender.com/",
});

export default API;
