const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 18, max: 65 },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: true,
    },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    city: { type: String, required: true, trim: true },
    lastDonationDate: { type: Date, default: null },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donor", donorSchema);
