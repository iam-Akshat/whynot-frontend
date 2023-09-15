import { Context, createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type AuthContextType = {
  getUser: () => User;
  isLogin: () => boolean;
  logout: () => void;
  getToken: () => string | null;
  login: (user: any, token: string) => void;
};

export type User = {
  id: number;
  fullName: string;
  phone: string;
  isVerified: boolean;
  meta: Record<string, any>;
  photoUrl: string | null;
};

export const AuthContext: Context<any> = createContext(null);

export const AuthProvider = ({ children }: any) => {
  const getUser = () => {
    return JSON.parse(localStorage.getItem("user") || "{}");
  };

  const isLogin = () => {
    return !!localStorage.getItem("user");
  };
  const getToken = () => {
    return localStorage.getItem("token");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const login = (user: any, token: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  return (
    <AuthContext.Provider
      value={{
        getUser,
        isLogin,
        logout,
        getToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const PrivateComponent = ({ children }: any) => {
  const { isLogin } = useContext(AuthContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin()) {
      navigate("/signin", { replace: true });
    }
  }, [isLogin]);
  return children;
};
