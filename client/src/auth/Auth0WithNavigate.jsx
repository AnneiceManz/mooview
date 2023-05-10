import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Auth0WithNavigate = ({ children }) => {
  const navigate = useNavigate();
  //this is what exposes the session history
  const domain = import.meta.env.VITE_AUTH0_DOMAIN
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
  //this allows the React SDK to connect with the correct application
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
  //this is what will take users back to your react application after they authenticate


  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };
  //this is the code that will make your application return to the last page that your user was on

  if (!(domain && clientId && redirectUri)) {
    return null
  }

  return (

      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: redirectUri
        }}
        onRedirectCallback={onRedirectCallback}
      >
        {children}
      </Auth0Provider>

  );
};

export default Auth0WithNavigate;