import React, { useReducer, useEffect } from "react";
import axios from "axios";
import authReducer, { ACTIONS, setAuthToken } from "../reducers/auth";
import { Redirect } from "react-router-dom";

// Set default config for axios
axios.defaults.baseURL =
  process.env.REACT_APP_SERVER_LINK || "http://localhost:5000";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.patch["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.timeout = 12000;
setAuthToken(localStorage.getItem("token"));

export const AuthContext = React.createContext();

export default function Auth({ children }) {
  const [auth, dispatch] = useReducer(authReducer, {
    token: localStorage.getItem("token"),
    user: null,
    isLoading: true,
    error: null,
  });

  const setAuthUser = async () => {
    try {
      dispatch({ type: ACTIONS.MAKE_REQUEST });
      const res = await axios.get("/auth");

      dispatch({ type: ACTIONS.SET_USER, payload: { user: res.data } });
    } catch (err) {
      console.log(err);
      dispatch({ type: ACTIONS.LOGIN_FAIL, payload: { error: err } });
      return <Redirect to="/login" />;
    }
  };

  useEffect(() => {
    setAuthToken(auth.token);
    if (auth.token) {
      setAuthUser();
    } else {
      dispatch({ type: ACTIONS.END_REQUEST });
    }

    return () => dispatch({ type: ACTIONS.REMOVE_ERROR });
  }, [auth.token]);

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
}
