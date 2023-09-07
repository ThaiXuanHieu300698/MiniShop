import React from "react";
import { useSelector } from "react-redux";
import NavMenu from "./NavMenu";
import { Container } from "@material-ui/core";
import Alert from "./Alert";
import { selectAlert } from "../../store/app-slice";
import { Helmet } from "react-helmet-async";

export const Layout = ({ title, description, children }) => {
  const alert = useSelector(selectAlert);
  return (
    <>
      <Helmet>
        <title>{title ? title + " - MiniShop" : "MiniShop"}</title>
        <meta name="description" content={description || "MiniShop"} />
      </Helmet>
      <Container>
        <NavMenu />
        {children}
        <Alert open={alert.open} message={alert.message} level={alert.level} />
      </Container>
    </>
  );
};
