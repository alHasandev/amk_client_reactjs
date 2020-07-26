import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../provider/Auth";
import Loader from "./Loader";

export default function ProtectedRoute({
  component: Component,
  children,
  hasAccess,
  redirect,
  ...rest
}) {
  const [auth] = useContext(AuthContext);

  if (auth.isLoading) return <Loader />;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!hasAccess) return redirect ? <Redirect to={redirect} /> : <></>;
        return !children ? <Component {...props} /> : children;
      }}
    />
  );
}
