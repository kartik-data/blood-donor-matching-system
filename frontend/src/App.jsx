import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RegisterDonor from "./pages/RegisterDonor";
import RequestBlood from "./pages/RequestBlood";
import SearchDonors from "./pages/SearchDonors";
import DonorPortal from "./pages/DonorPortal";
import AdminDashboard from "./pages/AdminDashboard";
import api from "./api"; // ✅ Correct relative path in the same folder

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-donor" element={<RegisterDonor />} />
          <Route path="/request-blood" element={<RequestBlood />} />
          <Route path="/search" element={<SearchDonors />} />
          <Route path="/donor-portal" element={<DonorPortal />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
    </div>
  );
}
