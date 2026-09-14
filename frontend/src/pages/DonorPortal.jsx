import { useState } from "react";
import api from "../api";

export default function DonorPortal() {
  const [phone, setPhone] = useState("");
  const [donor, setDonor] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLookup = async (e) => {
    e.preventDefault();
    setError("");
    setDonor(null);
    setLoading(true);
    try {
      const { data } = await api.get("/donor-portal/lookup", { params: { contactNumber: phone } });
      setDonor(data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async () => {
    try {
      const { data } = await api.put(`/donor-portal/${donor._id}/toggle-availability`);
      setDonor(data);
    } catch (err) {
      setError(err.response?.data?.message || "Could not update availability");
    }
  };

  return (
    <div className="form-container donor-portal">
      <h2>Donor Check-In</h2>
      <p className="search-subtitle">
        Enter your registered phone number to view your profile and update your availability.
      </p>

      <form onSubmit={handleLookup} className="search-bar">
        <input
          placeholder="Your registered phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Looking up..." : "Find My Profile"}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {donor && (
        <div className="donor-portal-card">
          <h3>Welcome back, {donor.name}</h3>
          <p>Blood Group: <strong>{donor.bloodGroup}</strong></p>
          <p>City: {donor.city}</p>
          <p>
            Current status:{" "}
            <span className={donor.isAvailable ? "status-available" : "status-unavailable"}>
              {donor.isAvailable ? "Available now" : "Not available"}
            </span>
          </p>
          <button className="btn btn-primary" onClick={handleToggle}>
            {donor.isAvailable ? "Mark as Not Available" : "Mark as Available Now"}
          </button>
          <p className="privacy-note">
            Only turn this on when you're genuinely willing to donate this week — your number
            is only shown to patients while you're marked available.
          </p>
        </div>
      )}
    </div>
  );
}
