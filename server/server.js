const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const cron = require("node-cron");
const fetchMarketPrices = require("./jobs/fetchMarketPrices");

const app = express(); // Moved up here

// Middleware setup
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Auth Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Recommendation Routes
const recommendationRoutes = require("./routes/recommendation");
app.use("/api/recommend", recommendationRoutes); 
// Corrected to include '/api' prefix

// Crop Routes
const cropRoutes = require("./routes/cropRoutes");
app.use("/api/crops", cropRoutes);

// Profile Routes
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);

// Market Prices Fetch (Agmarknet)
cron.schedule("0 6 * * *", () => {
  console.log("⏰ Running scheduled market price fetch...");
  fetchMarketPrices();
});

//uploads
app.use('/uploads', express.static('uploads'));

//lcc
const lccRoute = require('./routes/lccRoute');
app.use('/api/lcc', lccRoute);

//soli health form
const soilHealthRoutes = require('./routes/soilHealthRoutes');
app.use('/api/soil-health', soilHealthRoutes);


//adminRoutes
app.use('/api/admin', require('./routes/adminRoutes'));

//user routes for farmerprofile
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

app.use('/api/admin', require('./routes/adminRoutes'));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
