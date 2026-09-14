import axios from "axios";

// Make sure to replace 'your-actual-render-name' with your REAL Render backend URL
const REAL_RENDER_URL = "https://your-actual-render-name.onrender.com";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? `${REAL_RENDER_URL}/api`
    : "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;