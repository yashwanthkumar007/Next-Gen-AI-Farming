const Price = require('../models/Price')

// Add a new price entry
const addPrice = async (req, res) => {
  try {
    const {
      state,
      district,
      market,
      commodity,
      price_per_quintal,
      price_per_kg,
      arrival_tonnes,
      price_per_quintal_variation,
      price_per_kg_variation,
      arrival_tonnes_variation,
      date
    } = req.body

    const normalizedDate = new Date(date)
    normalizedDate.setHours(0, 0, 0, 0)

    const newPrice = new Price({
      state,
      district,
      market,
      commodity,
      price_per_quintal,
      price_per_kg,
      arrival_tonnes,
      price_per_quintal_variation,
      price_per_kg_variation,
      arrival_tonnes_variation,
      date: normalizedDate
    })

    await newPrice.save()
    res.status(201).json({ message: 'Price added successfully' })
  } catch (err) {
    console.error('Error in addPrice:', err)
    res.status(500).json({ error: 'Server error while adding price' })
  }
}

// Filter prices by state, district, commodity, and date range
const filterPrices = async (req, res) => {
  try {
    const { state, district, commodity, fromDate, toDate } = req.query;

    const from = new Date(fromDate);
    from.setHours(0, 0, 0, 0);

    const to = new Date(toDate);
    to.setHours(0, 0, 0, 0);

    // Log query parameters and normalized dates
    console.log({ state, district, commodity, from, to });

    const prices = await Price.find({
      state,
      district,
      commodity,
      date: {
        $gte: from,
        $lte: to
      }
    }).sort({ date: -1 });

    // Fallback if no data found
    if (prices.length === 0) {
      const fallback = await Price.find().sort({ date: -1 });
      return res.status(200).json({
        message: 'No data found for the given parameters. Returning all data for reference.',
        fallback
      });
    }

    res.json(prices);
  } catch (err) {
    console.error('Error in filterPrices:', err);
    res.status(500).json({ error: 'Server error while fetching prices' });
  }
};

module.exports = {
  addPrice,
  filterPrices
}
