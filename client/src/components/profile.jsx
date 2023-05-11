import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Image } from "semantic-ui-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

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
