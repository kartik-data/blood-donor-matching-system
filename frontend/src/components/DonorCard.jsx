export default function DonorCard({ donor }) {
  const scoreLabel =
    donor.matchScore >= 90 ? "Best match" : donor.matchScore >= 60 ? "Good match" : "Possible match";
  const scoreClass =
    donor.matchScore >= 90 ? "badge-best" : donor.matchScore >= 60 ? "badge-good" : "badge-fair";

  // Privacy: only reveal the full contact number if the donor has marked themselves available.
  // Otherwise show a masked number so patients aren't tempted to call someone who opted out.
  const maskNumber = (num) => (num ? `${num.slice(0, 2)}XXXXX${num.slice(-3)}` : "");

  return (
    <div className="donor-card">
      <div className="donor-card-header">
        <h4>{donor.name}</h4>
        <span className={`badge ${scoreClass}`}>{scoreLabel}</span>
      </div>
      <div className="donor-card-body">
        <span className="blood-group-pill">{donor.bloodGroup}</span>
        <p><i className="donor-icon">📍</i>{donor.city}</p>
        <p>
          Contact:{" "}
          {donor.isAvailable ? donor.contactNumber : maskNumber(donor.contactNumber)}
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
