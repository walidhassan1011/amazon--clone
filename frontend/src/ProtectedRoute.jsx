import React from "react";
import { Redirect, Route } from "react-router-dom";
import { UseFetching } from "./context/ProductsFetching";

function ProtectedRoute({ component: Component, ...rest }) {
  const { Verify } = UseFetching();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Verify) {
          return <Component {...props} />;
        } else {
          <Redirect to={"/" } />;
        }
      }}
    />
  );
}

export default ProtectedRoute;
