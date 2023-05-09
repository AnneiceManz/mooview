import React, {useState, useEffect, useContext} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "./AuthContext";
import { Button, Image } from "semantic-ui-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { authToken }= useContext(AuthContext)

  //A function to handle the post request
  const addUserToDB = async () => {
    const userData = { user_id: user.user_id, email: user.email, username: user.nickname }
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken} `
      },
      body: JSON.stringify(userData)
    })
    .then((response) => {
      console.log("Response from post method", response);
      return response.json();
    })
    .then((data) => {
      console.log(data)
    });
  }

  useEffect(() => {
    if (authToken) addUserToDB();
  }, [authToken]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    isAuthenticated && (

    <div className="profile">
      <div className="sidebar">
        <Image avatar size="small" src={user.picture} alt={user.name} />
        <div className="sidebarItem">
          <h2>{user.name}</h2>
          <h2>{user.nickname}</h2>
          <p>{user.email}</p>
        </div>
        <div className="sidebarItem">
          <div className="sidebarButton">
            <Button>Update Profile</Button>
          </div>
          <div className="sidebarButton">
            <Button>Delete Profile</Button>
          </div>
        </div>
      </div>
      <div className="profileReviews">
        <h2>My Reviews</h2>
      </div>
    </div>
    )
  );
};

export default Profile;
