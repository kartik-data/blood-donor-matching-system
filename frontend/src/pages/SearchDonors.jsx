import { useState } from "react";
import api from "../api";
import DonorCard from "../components/DonorCard";
import HospitalCard from "../components/HospitalCard";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function SearchDonors() {
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [city, setCity] = useState("");
  const [results, setResults] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError("Please enter a city to search");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { data } = await api.get("/search", { params: { bloodGroup, city } });
      setResults(data.results);
      setHospitals(data.hospitals || []);
    } catch (err) {
      setError(err.response?.data?.message || "Search failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page">
      <h2>Find Blood Now</h2>
      <p className="search-subtitle">
        Search directly for compatible, nearby donors — no need to file a formal request.
      </p>

      <form onSubmit={handleSearch} className="search-bar">
        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
          {bloodGroups.map((bg) => (
            <option key={bg}>{bg}</option>
          ))}
        </select>
        <input
          placeholder="Enter city (e.g. Mumbai)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {results !== null && (
        <div className="results-section">
          <h3>{results.length} compatible donor{results.length !== 1 ? "s" : ""} found</h3>
          {results.length === 0 && (
            <p>No compatible donors found for this blood group and city yet. Try a nearby city.</p>
          )}
          <div className="donor-cards">
            {results.map((donor) => (
              <DonorCard key={donor._id} donor={donor} />
            ))}
          </div>

          <h3 className="hospital-heading">
            {hospitals.length} hospital{hospitals.length !== 1 ? "s" : ""} with stock nearby
          </h3>
          {hospitals.length === 0 && <p>No hospital stock found for this blood group and city.</p>}
          <div className="donor-cards">
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital._id} hospital={hospital} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
