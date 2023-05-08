import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import IMAGES from "../images/IMAGES";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link } from "react-router-dom";
import { Image, Button } from "semantic-ui-react";

function MyNavBar(props) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  console.log("From Navbar", user);
  console.log("From Navbar", isAuthenticated);

  return (
    <>
      <Navbar data-testid="navbar" bg="white" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <Image
              src={IMAGES.mooview_logo}
              size="small"
              alt="Mooview Logo"
            />
          </Navbar.Brand>
          {!user ? null : (
            <Nav.Link to="/user-profile" as={Link}>
              {user.name}
            </Nav.Link>
          )}
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              {!isAuthenticated ? (
                <Button onClick={() => loginWithRedirect()}>Log In</Button>
              ) : (
                <Button
                  onClick={() =>
                    logout({
                      logoutParams: { returnTo: window.location.origin },
                    })
                  }
                >
                  Log Out
                </Button>
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
