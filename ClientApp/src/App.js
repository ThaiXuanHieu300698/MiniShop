import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import Router from "./Router";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <HelmetProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </HelmetProvider>
      </Provider>
    </React.Fragment>
  );
};

export default App;
