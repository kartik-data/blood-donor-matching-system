export default function HospitalCard({ hospital }) {
  return (
    <div className="hospital-card">
      <div className="donor-card-header">
        <h4>{hospital.name}</h4>
        <span className="badge badge-hospital">{hospital.unitsAvailable} units in stock</span>
      </div>
      <div className="donor-card-body">
        <p>{hospital.address || hospital.city}</p>
        <p>City: {hospital.city}</p>
        <p>Contact: {hospital.contactNumber}</p>
      </div>
    </div>
  );
}
