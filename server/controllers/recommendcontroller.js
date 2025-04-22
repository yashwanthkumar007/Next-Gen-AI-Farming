const recommendcontroller = {
  getCropRecommendation: async (req, res) => {
    try {
      const { crop, location } = req.body;

      // Sample logic – this can later be replaced with DB/AI logic
      const fertilizerPlans = {
        rice: {
          fertilizer: "Urea",
          dosage: "60 kg/acre",
          note: "Apply half at transplanting and half after 3 weeks.",
        },
        wheat: {
          fertilizer: "DAP",
          dosage: "50 kg/acre",
          note: "Apply at the time of sowing.",
        },
        maize: {
          fertilizer: "NPK 20-20-0",
          dosage: "70 kg/acre",
          note: "Use split dose during vegetative phase.",
        },
        soybean: {
            fertilizer: "DAP",
            dosage: "50 kg/acre",
            note: "Apply at sowing time.",
          },
          sunflower: {
            fertilizer: "NPK 20:20:0",
            dosage: "60 kg/acre",
            note: "Split dose: sowing and budding stage.",
          },
          otato: {
            fertilizer: "NPK 12:32:16",
            dosage: "100 kg/acre",
            note: "Apply during field preparation.",
          },
          tomato: {
            fertilizer: "NPK 19:19:19",
            dosage: "80 kg/acre",
            note: "Split application at transplanting and flowering.",
          },
          onion: {
            fertilizer: "DAP + Urea",
            dosage: "70 kg/acre",
            note: "Apply in 2 doses after transplanting.",
          },
          brinjal: {
            fertilizer: "NPK 10:26:26",
            dosage: "60 kg/acre",
            note: "Apply in two splits after transplanting.",
          },
          cauliflower: {
            fertilizer: "NPK 15:15:15",
            dosage: "70 kg/acre",
            note: "Apply before and after curd formation.",
          },
          cabbage: {
            fertilizer: "Urea + Compost",
            dosage: "60 kg/acre",
            note: "Apply before and 30 days after transplanting.",
          },
          mango: {
            fertilizer: "NPK 6:6:6",
            dosage: "1 kg/tree/year",
            note: "Apply in split doses during monsoon and post-monsoon.",
          },
          banana: {
            fertilizer: "Urea + MOP",
            dosage: "150 gm/plant/month",
            note: "Apply monthly till fruiting.",
          },
          guava: {
            fertilizer: "Farmyard Manure + NPK",
            dosage: "2 kg/tree/year",
            note: "Apply before flowering.",
          },
          papaya: {
            fertilizer: "Urea + DAP",
            dosage: "200 gm/plant/month",
            note: "Apply monthly till harvesting.",
          },
          apple: {
            fertilizer: "NPK 10:10:10",
            dosage: "2 kg/tree/year",
            note: "Apply in spring before flowering.",
          },
          pomegranate: {
            fertilizer: "Compost + NPK",
            dosage: "3 kg/tree/year",
            note: "Apply before flowering season.",
          },
          orange: {
            fertilizer: "Farmyard Manure + NPK",
            dosage: "2 kg/tree/year",
            note: "Apply in two equal splits.",
          },
          sweetLime: {
            fertilizer: "Urea + MOP",
            dosage: "1.5 kg/tree/year",
            note: "Apply before and after flowering.",
          },
          sapota: {
            fertilizer: "Compost + Urea",
            dosage: "3 kg/tree/year",
            note: "Apply once annually.",
          },
          jackfruit: {
            fertilizer: "NPK 6:6:6",
            dosage: "2 kg/tree/year",
            note: "Apply before monsoon.",
          },
          pineapple: {
            fertilizer: "NPK 10:10:10",
            dosage: "30 gm/plant/month",
            note: "Apply every 45 days.",
          },
          watermelon: {
            fertilizer: "Urea",
            dosage: "40 kg/acre",
            note: "Apply at vine development stage.",
          },
          muskmelon: {
            fertilizer: "Compost + Urea",
            dosage: "35 kg/acre",
            note: "Apply before flowering.",
          },
          grapes: {
            fertilizer: "FYM + NPK",
            dosage: "4 kg/vine/year",
            note: "Apply post-pruning.",
          },
          litchi: {
            fertilizer: "Organic Compost",
            dosage: "5 kg/tree/year",
            note: "Apply annually during spring.",
          },
      };

      const recommendation = fertilizerPlans[crop?.toLowerCase()];

      if (!recommendation) {
        return res.status(404).json({ message: "No recommendation found for the crop." });
      }

      return res.json({
        crop,
        location,
        fertilizer: recommendation.fertilizer,
        dosage: recommendation.dosage,
        note: recommendation.note,
      });
    } catch (err) {
      console.error("Error in getCropRecommendation:", err);
      return res.status(500).json({ message: "Server Error" });
    }
  },

  getFlaskPrediction: async (req, res) => {
    try {
      // your Flask logic here if any
      res.json({ message: "Flask integration pending" });
    } catch (error) {
      console.error("Error in getFlaskPrediction:", error);
      res.status(500).json({ message: "Flask server error" });
    }
  },
};

module.exports = recommendcontroller;
