require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const donorRoutes = require("./routes/donorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const searchRoutes = require("./routes/searchRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const donorPortalRoutes = require("./routes/donorPortalRoutes");

const app = express();

// Set up allowed origins for development & production
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Common Vite dev port
  process.env.FRONTEND_URL  // Your Vercel domain from Render environment variables
].filter(Boolean);          // Removes undefined values if process.env.FRONTEND_URL isn't set yet

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Optional: keeps cookies/headers working if using authentication
  })
);

app.use(express.json());

connectDB();

app.use("/api/donors", donorRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.use("/api/donor-portal", donorPortalRoutes);

app.get("/", (req, res) => {
  res.send("Blood Request and Donor Matching System API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));