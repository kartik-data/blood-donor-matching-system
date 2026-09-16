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
  "http://localhost:5173",
  "https://blood-donor-matching-system.vercel.app", // Explicit fallback
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Explicitly handle preflight OPTIONS requests across all routes
app.options("*", cors(corsOptions));

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