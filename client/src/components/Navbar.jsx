import React, { useEffect } from "react";
import IMAGES from "../images/IMAGES";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";
import { Button, Image, Menu, Container } from "semantic-ui-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import SignupButton from "./SignupButton";
import Searchbar from "./Search/Searchbar";

function MyNavBar() {
  const { user, isAuthenticated } = useAuth0();

  //A function to handle the post request
  const addUserToDB = async (authUser) => {
    try {
      const userInfo = {
        user_id: authUser.sub,
        name: authUser.name,
        email: authUser.email,
        username: authUser.nickname,
      };
      const response = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      const userAdded = await response.json();
      console.log(userAdded);
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
      <Menu compact stackable fixed="top" borderless  >
            <Image  href="/" src={IMAGES.mooview_logo} size="small" alt="Mooview Logo" />
        <Container>
          <Menu.Item>
          {!user ? null : <h3>Hello {user.nickname}!</h3>}

          </Menu.Item>
            <Menu.Menu position="right">
            <Searchbar />
              <Menu.Item>
              {!isAuthenticated && (
                  <Button.Group>

                  <SignupButton />
                  <LoginButton />
                  </Button.Group>

              )}
              {isAuthenticated && (

                  <Button.Group>
                  <Button color="blue" as={Link} to='/profile'>
                    Profile
                  </Button>
                  <LogoutButton />
                  </Button.Group>
              )}
              </Menu.Item>
            </Menu.Menu>
        </Container>
      </Menu>
      <Container  style={{marginTop: '13em'}}>

      <Outlet />
      </Container>
    </>
  );
}

export default MyNavBar;
