const BloodRequest = require("../models/BloodRequest");
const Donor = require("../models/Donor");
const { findMatchingDonors } = require("../utils/matching");

// CREATE - submit a new blood request
exports.createRequest = async (req, res) => {
  try {
    const request = await BloodRequest.create(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// READ - get all requests (optionally filter by ?status=)
exports.getRequests = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const requests = await BloodRequest.find(filter).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE - change request status (Pending -> In Progress -> Fulfilled)
exports.updateRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json(request);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE - remove a request
exports.deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findByIdAndDelete(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CORE FEATURE - find and rank compatible donors for a specific request
exports.getMatchesForRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });

    const allDonors = await Donor.find({});
    const ranked = findMatchingDonors(allDonors, request);

    res.json({
      request,
      matches: ranked.map((r) => ({ ...r.donor.toObject(), matchScore: r.matchScore })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
