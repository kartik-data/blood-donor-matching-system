import axios from "axios";

// If deployed on Vercel or local, use live Render URL when online
const API_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://your-backend-name.onrender.com/api"  // Replace with your actual Render URL
  : "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;