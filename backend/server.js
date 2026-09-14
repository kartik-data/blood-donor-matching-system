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

app.use(cors());
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