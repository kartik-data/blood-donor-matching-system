export default function DonorCard({ donor }) {
  // Return null or fallback if the donor prop itself is missing
  if (!donor) return null;

  // Provide default matchScore fallback (0) to prevent undefined checks
  const matchScore = donor.matchScore ?? 0;

  const scoreLabel =
    matchScore >= 90 ? "Best match" : matchScore >= 60 ? "Good match" : "Possible match";
  const scoreClass =
    matchScore >= 90 ? "badge-best" : matchScore >= 60 ? "badge-good" : "badge-fair";

  // Privacy: only reveal the full contact number if the donor has marked themselves available.
  // Added optional chaining (?.) and fallback so slice doesn't crash if contactNumber is missing
  const maskNumber = (num) => (num ? `${String(num).slice(0, 2)}XXXXX${String(num).slice(-3)}` : "N/A");

  return (
    <div className="donor-card">
      <div className="donor-card-header">
        <h4>{donor.name || "Unknown Donor"}</h4>
        <span className={`badge ${scoreClass}`}>{scoreLabel}</span>
      </div>
      <div className="donor-card-body">
        <span className="blood-group-pill">{donor.bloodGroup || "N/A"}</span>
        <p><i className="donor-icon">📍</i>{donor.city || "Unknown Location"}</p>
        <p>
          Contact:{" "}
          {donor.isAvailable ? (donor.contactNumber || "N/A") : maskNumber(donor.contactNumber)}
        </p>
        {!donor.isAvailable && (
          <p className="privacy-note">Number revealed once donor confirms availability</p>
        )}
        <p>
          Status:{" "}
          <span className={donor.isAvailable ? "status-available" : "status-unavailable"}>
            {donor.isAvailable ? "Available now" : "Not available"}
          </span>
        </p>
      </div>
    </div>
  );
}