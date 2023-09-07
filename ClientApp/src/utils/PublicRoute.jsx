import React from "react";
import { Route, Redirect } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const PublicRoute = ({ component: Component, ...rest }) => {
  const user = cookies.get("user");
  console.log(user);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
        )
      }
    />
  );
};

export default PublicRoute;
