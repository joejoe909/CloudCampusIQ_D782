import React, {createContext, useContext, useEffect, useMemo, useState} from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    async function checkAuth(){
        try{
            setAuthLoading(true);

            const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
                method: "GET",
                credentials: "include",
            });

            const data = await response.json();

            if(!response.ok){
                setUser(null);
                return null;
            }

            setUser(data.user);
            return data.user;
        }
        catch(error)
        {
            setUser(null);
            return null;
        }
        finally{
            setAuthLoading(false);
        }
    }

    async function login(email, password)
    {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({email, password}),
        });

        const data = await response.json();

        if(!response.ok)
        {
            throw new Error(data.message || "Login failed");
        }

        setUser(data.user);
        return data.user;
    }

    async function register(name, email, password) 
    {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, 
        {
            method: "POST",
            headers:
            {
                "Content-Type": "application/json",
            },
            
            credentials: "include",
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) 
        {
            throw new Error(data.message || "Registration failed");
        }

        setUser(data.user);
        return data.user;
    }

    async function logout()
    {
        try 
        {
            await fetch(`${API_BASE_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
            });
        }
        finally
        {
            setUser(null);
        }
    }

    useEffect(() => {checkAuth();}, []);

    const value = useMemo(() => ({
        user,
        authLoading,
        login,
        register,
        logout,
        checkAuth,
        isAuthenticated: !!user,
    }),[user, authLoading]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}