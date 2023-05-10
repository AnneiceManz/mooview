import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import IMAGES from "../images/IMAGES";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";

function MyNavBar(props) {
  const { user, isAuthenticated } = useAuth0();
  const location = useLocation();

  //A function to handle the post request
  const addUserToDB = async (authUser) => {
    try {
      const userInfo = {
        user_id: authUser.sub,
        name: authUser.name,
        email: authUser.email,
        user_username: authUser.nickname,
      };
      const response = await fetch(`api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      const userAdded = await response.json();
      console.log(userAdded);
      this.forceUpdate();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    addUserToDB(user);
  }, [user, isAuthenticated]);

  console.log("From Navbar", user);
  console.log("From Navbar", isAuthenticated);

  return (
    <>
      <Navbar data-testid="navbar" bg="white" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <Image src={IMAGES.mooview_logo} size="small" alt="Mooview Logo" />
          </Navbar.Brand>
          {!user ? null : <h3>Hello {user.nickname}!</h3>}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {!isAuthenticated && (
                <>
                  <SignupButton />
                  <LoginButton />
                </>
              )}
              {isAuthenticated && (
                <>
                  <Button color="blue">
                    <Link to="/profile">Profile</Link>
                  </Button>
                  <LogoutButton />
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default MyNavBar;
