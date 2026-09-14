const Donor = require("../models/Donor");

// CREATE - register a new donor
exports.createDonor = async (req, res) => {
  try {
    const donor = await Donor.create(req.body);
    res.status(201).json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - get all donors (supports optional ?city=&bloodGroup= filters)
exports.getDonors = async (req, res) => {
  try {
    const filter = {};
    if (req.query.city) filter.city = new RegExp(req.query.city, "i");
    if (req.query.bloodGroup) filter.bloodGroup = req.query.bloodGroup;

    const donors = await Donor.find(filter).sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ - get a single donor by id
exports.getDonorById = async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - edit donor details (e.g. mark unavailable, update last donation date)
exports.updateDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json(donor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - remove a donor record
exports.deleteDonor = async (req, res) => {
  try {
    const donor = await Donor.findByIdAndDelete(req.params.id);
    if (!donor) return res.status(404).json({ message: "Donor not found" });
    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
