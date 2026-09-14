import { useEffect, useState } from "react";
import api from "../api";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function AdminDashboard() {
  const [donors, setDonors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [tab, setTab] = useState("requests");
  const [newHospital, setNewHospital] = useState({
    name: "",
    city: "",
    address: "",
    contactNumber: "",
    inventory: bloodGroups.map((bg) => ({ bloodGroup: bg, units: 0 })),
  });

  const loadData = async () => {
    const [donorsRes, requestsRes, hospitalsRes] = await Promise.all([
      api.get("/donors"),
      api.get("/requests"),
      api.get("/hospitals"),
    ]);
    setDonors(donorsRes.data);
    setRequests(requestsRes.data);
    setHospitals(hospitalsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateRequestStatus = async (id, status) => {
    await api.put(`/requests/${id}`, { status });
    loadData();
  };

  const deleteDonor = async (id) => {
    if (!confirm("Delete this donor record?")) return;
    await api.delete(`/donors/${id}`);
    loadData();
  };

  const toggleAvailability = async (donor) => {
    await api.put(`/donors/${donor._id}`, { isAvailable: !donor.isAvailable });
    loadData();
  };

  const handleInventoryChange = (bloodGroup, value) => {
    setNewHospital((prev) => ({
      ...prev,
      inventory: prev.inventory.map((item) =>
        item.bloodGroup === bloodGroup ? { ...item, units: Number(value) } : item
      ),
    }));
  };

  const addHospital = async (e) => {
    e.preventDefault();
    if (!newHospital.name.trim() || !newHospital.city.trim() || !newHospital.contactNumber.trim()) {
      alert("Please fill in hospital name, city, and contact number");
      return;
    }
    await api.post("/hospitals", newHospital);
    setNewHospital({
      name: "",
      city: "",
      address: "",
      contactNumber: "",
      inventory: bloodGroups.map((bg) => ({ bloodGroup: bg, units: 0 })),
    });
    loadData();
  };

  const deleteHospital = async (id) => {
    if (!confirm("Delete this hospital record?")) return;
    await api.delete(`/hospitals/${id}`);
    loadData();
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="tabs">
        <button className={tab === "requests" ? "tab active" : "tab"} onClick={() => setTab("requests")}>
          Blood Requests ({requests.length})
        </button>
        <button className={tab === "donors" ? "tab active" : "tab"} onClick={() => setTab("donors")}>
          Donors ({donors.length})
        </button>
        <button className={tab === "hospitals" ? "tab active" : "tab"} onClick={() => setTab("hospitals")}>
          Hospitals ({hospitals.length})
        </button>
      </div>

      {tab === "requests" && (
        <table>
          <thead>
            <tr>
              <th>Patient</th><th>Group</th><th>City</th><th>Hospital</th><th>Urgency</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.patientName}</td>
                <td>{r.bloodGroup}</td>
                <td>{r.city}</td>
                <td>{r.hospitalName}</td>
                <td>{r.urgency}</td>
                <td>{r.status}</td>
                <td>
                  <select value={r.status} onChange={(e) => updateRequestStatus(r._id, e.target.value)}>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Fulfilled</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "donors" && (
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Group</th><th>City</th><th>Contact</th><th>Available</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>{d.bloodGroup}</td>
                <td>{d.city}</td>
                <td>{d.contactNumber}</td>
                <td>{d.isAvailable ? "Yes" : "No"}</td>
                <td>
                  <button className="btn-small" onClick={() => toggleAvailability(d)}>Toggle</button>
                  <button className="btn-small btn-danger" onClick={() => deleteDonor(d._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === "hospitals" && (
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th><th>City</th><th>Contact</th><th>Stock (by group)</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hospitals.map((h) => (
                <tr key={h._id}>
                  <td>{h.name}</td>
                  <td>{h.city}</td>
                  <td>{h.contactNumber}</td>
                  <td>
                    {h.inventory
                      .filter((i) => i.units > 0)
                      .map((i) => `${i.bloodGroup}: ${i.units}`)
                      .join(", ") || "No stock"}
                  </td>
                  <td>
                    <button className="btn-small btn-danger" onClick={() => deleteHospital(h._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="add-hospital-heading">Add a Hospital</h3>
          <form onSubmit={addHospital} className="hospital-form">
            <input
              placeholder="Hospital name"
              value={newHospital.name}
              onChange={(e) => setNewHospital({ ...newHospital, name: e.target.value })}
            />
            <input
              placeholder="City"
              value={newHospital.city}
              onChange={(e) => setNewHospital({ ...newHospital, city: e.target.value })}
            />
            <input
              placeholder="Address (optional)"
              value={newHospital.address}
              onChange={(e) => setNewHospital({ ...newHospital, address: e.target.value })}
            />
            <input
              placeholder="Contact number"
              value={newHospital.contactNumber}
              onChange={(e) => setNewHospital({ ...newHospital, contactNumber: e.target.value })}
            />

            <p className="inventory-label">Units available per blood group:</p>
            <div className="inventory-grid">
              {newHospital.inventory.map((item) => (
                <label key={item.bloodGroup} className="inventory-input">
                  {item.bloodGroup}
                  <input
                    type="number"
                    min="0"
                    value={item.units}
                    onChange={(e) => handleInventoryChange(item.bloodGroup, e.target.value)}
                  />
                </label>
              ))}
            </div>

            <button type="submit" className="btn btn-primary">Add Hospital</button>
          </form>
        </div>
      )}
    </div>
  );
}
