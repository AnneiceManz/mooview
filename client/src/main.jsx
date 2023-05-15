import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import {
  BrowserRouter
} from "react-router-dom";
import Auth0WithNavigate from "./auth/Auth0WithNavigate";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0WithNavigate>
        <App />
      </Auth0WithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
