import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../provider/Auth";
import { ACTIONS } from "../reducers/auth";
import Loader from "../components/Loader";

export default function Logout() {
  const [auth, dispatch] = useContext(AuthContext);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: ACTIONS.LOGOUT });
    }, 3000);
    return () => clearTimeout(timeout);
  }, [dispatch]);

  if (!auth.token && !auth.isLoading) return <Redirect to="/login" />;

  return <Loader />;
}
