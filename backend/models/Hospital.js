const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema(
  {
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    units: { type: Number, required: true, min: 0, default: 0 },
  },
  { _id: false }
);

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    address: { type: String, trim: true },
    contactNumber: { type: String, required: true },
    inventory: {
      type: [inventoryItemSchema],
      default: () =>
        ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => ({
          bloodGroup: bg,
          units: 0,
        })),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hospital", hospitalSchema);