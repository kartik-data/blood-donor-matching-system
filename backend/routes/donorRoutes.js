const express = require("express");
const router = express.Router();
const {
  createDonor,
  getDonors,
  getDonorById,
  updateDonor,
  deleteDonor,
} = require("../controllers/donorController");

router.post("/", createDonor);
router.get("/", getDonors);
router.get("/:id", getDonorById);
router.put("/:id", updateDonor);
router.delete("/:id", deleteDonor);

module.exports = router;
