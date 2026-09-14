import { useState } from "react";
import api from "../api";
import DonorCard from "../components/DonorCard";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RequestBlood() {
  const [form, setForm] = useState({
    patientName: "",
    bloodGroup: "O+",
    unitsRequired: 1,
    city: "",
    hospitalName: "",
    contactNumber: "",
    urgency: "Medium",
  });
  const [errors, setErrors] = useState({});
  const [matches, setMatches] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.patientName.trim()) newErrors.patientName = "Patient name is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.hospitalName.trim()) newErrors.hospitalName = "Hospital name is required";
    if (!/^\d{10}$/.test(form.contactNumber))
      newErrors.contactNumber = "Enter a valid 10-digit phone number";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const { data: request } = await api.post("/requests", {
        ...form,
        unitsRequired: Number(form.unitsRequired),
      });
      const { data } = await api.get(`/requests/${request._id}/matches`);
      setMatches(data.matches);
      setErrors({});
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="form-container">
      <h2>Request Blood</h2>
      {errors.submit && <p className="error-msg">{errors.submit}</p>}

      <form onSubmit={handleSubmit}>
        <label>Patient Name</label>
        <input name="patientName" value={form.patientName} onChange={handleChange} />
        {errors.patientName && <span className="error-msg">{errors.patientName}</span>}

        <label>Blood Group Needed</label>
        <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
          {bloodGroups.map((bg) => (
            <option key={bg}>{bg}</option>
          ))}
        </select>

        <label>Units Required</label>
        <input type="number" name="unitsRequired" min="1" value={form.unitsRequired} onChange={handleChange} />

        <label>City</label>
        <input name="city" value={form.city} onChange={handleChange} />
        {errors.city && <span className="error-msg">{errors.city}</span>}

        <label>Hospital Name</label>
        <input name="hospitalName" value={form.hospitalName} onChange={handleChange} />
        {errors.hospitalName && <span className="error-msg">{errors.hospitalName}</span>}

        <label>Contact Number</label>
        <input name="contactNumber" value={form.contactNumber} onChange={handleChange} />
        {errors.contactNumber && <span className="error-msg">{errors.contactNumber}</span>}

        <label>Urgency</label>
        <select name="urgency" value={form.urgency} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <button type="submit" className="btn btn-primary">Submit Request & Find Donors</button>
      </form>

      {matches && (
        <div className="matches-section">
          <h3>Matching Donors ({matches.length} found)</h3>
          {matches.length === 0 && <p>No compatible donors found yet. Please check back later.</p>}
          <div className="donor-cards">
            {matches.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
