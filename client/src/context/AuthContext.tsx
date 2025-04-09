import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
}

const initialState: AuthContextType = {
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  logout: () => {},
  isLoggedIn: false,
};

export const AuthContext = createContext<AuthContextType>(initialState);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email,
          password,
        }
      );

      const userData = response.data;
      setUser(userData);
      setIsLoggedIn(true);

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Set default auth header for axios
      axios.defaults.headers.common["x-auth-token"] = userData.token;

      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  const logout = () => {
    // Remove user data from localStorage
    localStorage.removeItem("user");

    // Remove auth header
    delete axios.defaults.headers.common["x-auth-token"];

    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
