import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function validateForm() {
    const nextErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Enter a valid email address";
    }

    if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password
      );

      navigate("/dashboard");
    } catch (error) {
      setMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.name && <p style={styles.error}>{errors.name}</p>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.email && <p style={styles.error}>{errors.email}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.password && <p style={styles.error}>{errors.password}</p>}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={styles.input}
          />
          {errors.confirmPassword && (
            <p style={styles.error}>{errors.confirmPassword}</p>
          )}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {message && <p style={styles.error}>{message}</p>}

        <p style={{ marginTop: "1rem" }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "center",
    background: "#f6f7fb",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#0078d4",
    color: "white",
    cursor: "pointer",
  },
  error: {
    color: "crimson",
    margin: 0,
    fontSize: "0.9rem",
  },
};