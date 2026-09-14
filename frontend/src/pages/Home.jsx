import { Link } from "react-router-dom";
import QuoteBanner from "../components/QuoteBanner";

export default function Home() {
  return (
    <div className="home">
      <QuoteBanner />
      <h2>Connecting Blood Donors with People in Need</h2>
      <p>
        Register as a donor to help save lives, or search for compatible, nearby
        donors and hospital blood banks the moment you need them.
      </p>
      <div className="home-actions">
        <Link to="/search" className="btn btn-primary">
          Find Blood Now
        </Link>
        <Link to="/register-donor" className="btn btn-secondary">
          Become a Donor
        </Link>
      </div>

      <div className="stats-strip">
        <div className="stat-box">
          <span className="stat-number">3</span>
          <span className="stat-label">lives saved per donation</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">56</span>
          <span className="stat-label">days blood can be stored</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">1</span>
          <span className="stat-label">donor can start a chain reaction of hope</span>
        </div>
      </div>
    </div>
  );
}
