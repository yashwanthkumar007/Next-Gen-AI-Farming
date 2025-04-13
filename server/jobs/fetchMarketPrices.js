const axios = require("axios");
const MarketPrice = require("../models/MarketPrice");

const fetchMarketPrices = async () => {
  try {
    console.log("📦 Fetching market prices...");

    // Replace with the actual API URL that fetches market prices
    const { data } = await axios.get("http://localhost:5000/request?commodity=all&state=Tamil Nadu&market=Erode");

    // Check if data is valid
    if (data && Array.isArray(data)) {
      console.log("Data fetched successfully, processing...");

      for (const item of data) {
        // Example of mapping the fields from the API to the database model
        const marketPriceData = {
          crop: item.Commodity, // Commodity field from API
          price: item["Model Prize"], // Model Prize field from API
          state: item.State || "Default State", // Default value if not present
          district: item.City || "Default District", // Default value if not present
        };

        // Update or insert market prices in MongoDB
        await MarketPrice.findOneAndUpdate(
          { crop: marketPriceData.crop, state: marketPriceData.state, district: marketPriceData.district },
          { price: marketPriceData.price, updatedAt: new Date() },
          { upsert: true, new: true } // Insert new entry if none exists
        );
      }

      console.log("✅ Market prices updated successfully");
    } else {
      console.error("❌ Invalid data format received");
    }
  } catch (err) {
    console.error("❌ Error fetching prices:", err.message);
  }
};

module.exports = fetchMarketPrices;
