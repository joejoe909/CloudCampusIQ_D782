import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RoleRoute({ children, allowedRoles }) 
{
    const { user, authLoading } = useAuth();

    if (authLoading) 
    {
        return <div style={{ padding: "2rem" }}>Checking authorization...</div>;
    }

    if (!user) 
    {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role))
    {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}