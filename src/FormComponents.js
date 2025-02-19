import React, { useState } from "react";
import "./FormComponent.css"; // Import the updated CSS

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!formData.dob) newErrors.dob = "Date of Birth is required.";
    if (!formData.gender) newErrors.gender = "Please select a gender.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">

        {submitted ? (
          <div className="success-message">
            <h3>Submission Successful!</h3>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Date of Birth:</strong> {formData.dob}</p>
            <p><strong>Gender:</strong> {formData.gender}</p>
            <button className="back-btn" onClick={() => setSubmitted(false)}>Go Back</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
                placeholder="Enter your full name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder="Enter your email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "error" : ""}
                placeholder="Enter your phone number"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className={errors.dob ? "error" : ""}
              />
              {errors.dob && <span className="error-message">{errors.dob}</span>}
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? "error" : ""}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FormComponent;
