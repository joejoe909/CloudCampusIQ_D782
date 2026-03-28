import React from "react";
import { useAuth } from "../context/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Dashboard</h2>
        <p>You are logged in.</p>

        {user && (
          <pre style={styles.pre}>{JSON.stringify(user, null, 2)}</pre>
        )}

        <button onClick={handleLogout} style={styles.button}>
          Logout
        </button>
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
    maxWidth: "520px",
    background: "#fff",
    padding: "24px",
    borderRadius: "10px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.08)",
  },
  pre: {
    background: "#f4f4f4",
    padding: "12px",
    borderRadius: "6px",
    overflowX: "auto",
  },
  button: {
    padding: "12px",
    borderRadius: "6px",
    border: "none",
    background: "#d83b01",
    color: "white",
    cursor: "pointer",
  },
};