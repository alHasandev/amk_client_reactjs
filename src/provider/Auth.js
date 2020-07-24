import React, { useReducer } from "react";
import axios from "axios";
import authReducer from "../reducers/auth";

// Set default config for axios
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";

export const AuthContext = React.createContext();

export default function Auth({ children }) {
  const [auth, dispatch] = useReducer(authReducer, {
    data: localStorage.getItem("token"),
    isLoading: false,
    error: null,
  });

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}
