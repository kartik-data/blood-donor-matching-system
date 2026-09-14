import { useState } from "react";
import api from "../api";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export default function RegisterDonor() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "Male",
    bloodGroup: "O+",
    contactNumber: "",
    email: "",
    city: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.age || form.age < 18 || form.age > 65)
      newErrors.age = "Age must be between 18 and 65";
    if (!/^\d{10}$/.test(form.contactNumber))
      newErrors.contactNumber = "Enter a valid 10-digit phone number";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.city.trim()) newErrors.city = "City is required";
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
      await api.post("/donors", { ...form, age: Number(form.age) });
      setSuccess(true);
      setErrors({});
      setForm({
        name: "",
        age: "",
        gender: "Male",
        bloodGroup: "O+",
        contactNumber: "",
        email: "",
        city: "",
      });
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="form-container">
      <h2>Register as a Blood Donor</h2>
      {success && <p className="success-msg">Thank you! You are now registered as a donor.</p>}
      {errors.submit && <p className="error-msg">{errors.submit}</p>}

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input name="name" value={form.name} onChange={handleChange} />
        {errors.name && <span className="error-msg">{errors.name}</span>}

        <label>Age</label>
        <input type="number" name="age" value={form.age} onChange={handleChange} />
        {errors.age && <span className="error-msg">{errors.age}</span>}

        <label>Gender</label>
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <label>Blood Group</label>
        <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
          {bloodGroups.map((bg) => (
            <option key={bg}>{bg}</option>
          ))}
        </select>

        <label>Contact Number</label>
        <input name="contactNumber" value={form.contactNumber} onChange={handleChange} />
        {errors.contactNumber && <span className="error-msg">{errors.contactNumber}</span>}

        <label>Email</label>
        <input name="email" value={form.email} onChange={handleChange} />
        {errors.email && <span className="error-msg">{errors.email}</span>}

        <label>City</label>
        <input name="city" value={form.city} onChange={handleChange} />
        {errors.city && <span className="error-msg">{errors.city}</span>}

        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}
