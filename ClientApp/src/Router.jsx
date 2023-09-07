import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./pages/Product/Products";
import Cart from "./pages/Cart/Cart";
import LoginForm from "./pages/Auth/LoginForm";
import Detail from "./pages/Product/Detail";
import Checkout from "./pages/Checkout/Checkout";
import PrivateRoute from "./utils/PrivateRoute";

const Router = () => {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/login" exact component={LoginForm} />
      <Route path="/products/:id" exact component={Detail} />
      <PrivateRoute path="/checkout" exact component={Checkout} />
    </Switch>
  );
};

export default Router;
