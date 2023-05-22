import React, { useEffect, useState } from "react";
import IMAGES from "../../images/IMAGES";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Button, Image, Menu, Container, Form, Icon } from "semantic-ui-react";
import LoginButton from "../Auth0/LoginButton";
import LogoutButton from "../Auth0/LogoutButton";
import SignupButton from "../Auth0/SignupButton";
import Footer from "./Footer";

function MyNavBar() {
  const { user, isAuthenticated } = useAuth0();
  const [search, setSearch] = useState("");
  const [nav, setNav] = useState(false);

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

  const handleNavClick = () => {
    setNav(!nav);
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
    <div className="flex flex-wrap">
      <div className="sticky w-screen top-0 z-50 flex flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8 dark:bg-transparent">
        <div className="flex items-center">
          <Link to="/">
            <img
              src={IMAGES.mooview_logo2}
              alt="Mooview Logo"
              className="h-10 w-auto md:h-20 lg:h-24"
            />
          </Link>
        </div>
        <div className="bg-zinc-50 rounded-full shadow-lg  flex items-center px-2 h-[40px] w-[200px] sm:w-[400px] lg:w-[500px]">
          <input
            type="text"
            placeholder="Search movies..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            onKeyDown={handleKeyPress}
            className="bg-transparent p-2 w-full focus:outline-none"
          />
          <Icon
            name="search"
            color="grey"
            size="large"
            onClick={handleSubmit}
          />
        </div>
        <div className="hidden md:flex pr-4 items-center py-2 mr-10">
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
        </div>
        <div className="md:hidden mr-5">
            <Icon name="bars" size="big" color="red" onClick={handleNavClick} />
        </div>
        {nav ? (
          <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
        ) : (
          ""
        )}
        <div
          className={
            nav
              ? "fixed top-20 left-20 flex justify-center items-center w-[80vw] h-[200px] bg-white z-10 duration-300"
              : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
          }
        >
          <Icon
            name="close"
            onClick={() => setNav(!nav)}
            size="large"
            className="absolute right-4 top-4 cursor-pointer"
          />
          <nav className="flex justify-center ">
            {!isAuthenticated && (
              <div className="m-5">
                <Button.Group size="huge">
                  <SignupButton />
                  <LoginButton />
                </Button.Group>
              </div>
            )}
            {isAuthenticated && (
              <div className="m-5">
                <Button.Group size="huge">
                  <Button color="blue" as={Link} to="/profile">
                    Profile
                  </Button>
                  <LogoutButton />
                </Button.Group>
              </div>
            )}
          </nav>
        </div>
      </div>
      <Container style={{ width: "100vw", height: '100vh' }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default MyNavBar;
