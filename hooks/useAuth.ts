// hooks/useAuth.ts
import { useEffect, useState } from "react";
import API from "../utils/api";
import { clearTokens, getRefreshToken, saveTokens } from "../utils/authStorage";

interface User {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  lastLogin: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (phoneNumber: string, password: string) => {
    const res = await API.post("auth/login", { phoneNumber, password });
    const { user, tokens } = res.data.data;
    await saveTokens(tokens);
    setUser(user);
    console.log(user)
  };


  const refreshAccessToken = async () => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) return;

    try {
      const res = await API.post("auth/refresh-token", { refreshToken });
      const { tokens } = res.data.data;
      await saveTokens(tokens);
    } catch (err) {
      console.error("Token refresh failed");
      logout(); // If refresh fails, force logout
    }
  };

  const logout = async () => {
    const refreshToken = await getRefreshToken();
    try {
      if (refreshToken) {
        await API.post("/auth/logout", { refreshToken });
      }
    } catch (err) {
      console.error("Logout failed");
    } finally {
      await clearTokens();
      setUser(null);
    }
  };

  const loadUser = async () => {
    setLoading(true);
    try {
      await refreshAccessToken();
      const res = await API.get("auth/me"); // You must implement this route on backend
      setUser(res.data.data.user);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return {
    user,
    loading,
    login,
    logout,
  };
}
