import React, { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    async function loadAdmin() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/admin`, {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Forbidden");
        }

        setData(result);
        setMessage("Admin access granted");
      } catch (error) {
        setMessage(error.message || "Failed to load admin data");
      }
    }

    loadAdmin();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Page</h2>
      <p>{message}</p>
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}