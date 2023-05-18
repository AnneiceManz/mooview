import React, { useEffect } from "react";
import IMAGES from "../../images/IMAGES";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button, Image, Menu, Container, Form } from "semantic-ui-react";
import LoginButton from "../Auth0/LoginButton";
import LogoutButton from "../Auth0/LogoutButton";
import SignupButton from "../Auth0/SignupButton";

function MyNavBar() {
  const { user, isAuthenticated } = useAuth0();
  const [search, setSearch] = React.useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;
    navigate(`/search/${search}`);
    console.log("searched: ", search);
    setSearch("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  //A function to handle the post request
  const addUserToDB = async (authUser) => {
    try {
      const userInfo = {
        user_id: authUser.sub,
        name: authUser.name,
        email: authUser.email,
        username: authUser.nickname,
        picture: authUser.picture,
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
      <Menu size="small" stackable fixed="top" borderless widths={3}>
        <Menu.Item>
          <Image
            href="/"
            src={IMAGES.mooview_logo2}
            style={{ width: "15em", height: "auto", margin: "0.5em" }}
            alt="Mooview Logo"
          />
        </Menu.Item>
        <Menu.Item>
          <Form>
            <Form.Group>
              <Form.Input
                type="text"
                size="small"
                placeholder="Search..."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyPress={handleKeyPress}
              />
              <Form.Button
                floated="right"
                color="blue"
                size="small"
                type="submit"
                content="Search"
                onClick={handleSubmit}
              />
            </Form.Group>
          </Form>
        </Menu.Item>
        <Menu.Item position="right">
          {!isAuthenticated && (
            <Button.Group size="small">
              <SignupButton />
              <LoginButton />
            </Button.Group>
          )}
          {isAuthenticated && (
            <Button.Group size="small">
              <Button color="blue" as={Link} to="/profile">
                Profile
              </Button>
              <LogoutButton />
            </Button.Group>
          )}
        </Menu.Item>
      </Menu>
      <Container style={{ marginTop: "13em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default MyNavBar;
