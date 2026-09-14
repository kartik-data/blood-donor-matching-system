const Donor = require("../models/Donor");

// A donor looks up their own record using their registered phone number.
// This is a lightweight stand-in for real authentication (no login system yet).
exports.findDonorByPhone = async (req, res) => {
  try {
    const { contactNumber } = req.query;
    if (!contactNumber) {
      return res.status(400).json({ message: "contactNumber is required" });
    }
    const donor = await Donor.findOne({ contactNumber });
    if (!donor) {
      return res.status(404).json({ message: "No donor found with this phone number" });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleAvailability = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });

    donor.isAvailable = !donor.isAvailable;
    await donor.save();

    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};