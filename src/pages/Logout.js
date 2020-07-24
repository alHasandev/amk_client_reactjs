import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../provider/Auth";
import { ACTIONS } from "../reducers/auth";

export default function Logout() {
  const [auth, dispatch] = useContext(AuthContext);

  useEffect(() => {
    dispatch({ type: ACTIONS.LOGOUT });
  }, [dispatch]);

  if (!auth.data && !auth.isLoading) return <Redirect to="/login" />;

  return <h1>Loading...</h1>;
}
