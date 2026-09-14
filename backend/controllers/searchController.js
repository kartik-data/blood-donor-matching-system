const Donor = require("../models/Donor");
const { findMatchingDonors } = require("../utils/matching");

// Instant search - a patient searches directly by blood group + city
// without needing to file a formal blood request first.
exports.searchDonors = async (req, res) => {
  try {
    const { bloodGroup, city } = req.query;

    if (!bloodGroup || !city) {
      return res.status(400).json({ message: "bloodGroup and city are required" });
    }

    const allDonors = await Donor.find({});
    const ranked = findMatchingDonors(allDonors, { bloodGroup, city });

    res.json({
      query: { bloodGroup, city },
      count: ranked.length,
      results: ranked.map((r) => ({ ...r.donor.toObject(), matchScore: r.matchScore })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};