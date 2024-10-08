"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { login, logout } from "@/apis/authenticate.api";

interface AuthContextProps {
  isAuthenticated: boolean;
  isFetching: boolean;
  errorMessage: string | null;
  handleLogin: (
    username: string,
    password: string,
    rememberMe: boolean,
    redirect?: string | null
  ) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isFetching: false,
  handleLogin: async () => {},
  handleLogout: () => {},
  errorMessage: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (
    email: string,
    password: string,
    rememberMe: boolean,
    redirect?: string | null
  ) => {
    console.log(123);
    setIsFetching(true);
    setErrorMessage(null);
    try {
      const response = await login({
        userNameOrEmailAddress: email,
        password,
        rememberMe,
      });
      if (response.result === "success") {
        if (redirect) {
          router.push(redirect);
        } else {
          router.push("/chat");
        }
      } else {
        setErrorMessage("Authentication Failed");
      }
    } catch (error) {
      setErrorMessage("Authentication Failed");
      console.error(error);
    }
    setIsFetching(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isFetching,
        handleLogin,
        errorMessage,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
