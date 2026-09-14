import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">🩸 BloodConnect</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/search">Find Blood Now</Link>
        <Link to="/register-donor">Register as Donor</Link>
        <Link to="/request-blood">Request Blood</Link>
        <Link to="/donor-portal">Donor Check-In</Link>
        <Link to="/admin">Admin Dashboard</Link>
      </div>
    </nav>
  );
}
