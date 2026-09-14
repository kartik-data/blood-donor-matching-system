const express = require("express");
const router = express.Router();
const { findDonorByPhone, toggleAvailability } = require("../controllers/donorPortalController");

router.get("/lookup", findDonorByPhone);
router.put("/:id/toggle-availability", toggleAvailability);

module.exports = router;