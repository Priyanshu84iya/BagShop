"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name?: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("pryvento-user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to load user:", e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        localStorage.setItem("pryvento-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("pryvento-user");
      }
    }
  }, [user, isLoaded]);

  const signup = (name: string, email: string, password: string): boolean => {
    // Get existing users
    const usersData = localStorage.getItem("pryvento-users");
    const users = usersData ? JSON.parse(usersData) : {};

    // Check if user already exists
    if (users[email]) {
      return false;
    }

    // Save new user
    users[email] = { name, password };
    localStorage.setItem("pryvento-users", JSON.stringify(users));

    // Auto login
    setUser({ email, name });
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const usersData = localStorage.getItem("pryvento-users");
    const users = usersData ? JSON.parse(usersData) : {};

    if (users[email] && users[email].password === password) {
      setUser({ email, name: users[email].name });
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
