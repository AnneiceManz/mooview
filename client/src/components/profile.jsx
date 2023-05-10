import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Image } from "semantic-ui-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  //A function to handle the post request
  const addUserToDB = async () => {
    try {
      if (user) {
        const userInfo = { user_id: user.sub, name: user.name, email: user.email, username: user.nickname };
        const response = await fetch(`api/users`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(userInfo)
        });
        const userAdded = await response.json();
        console.log(userAdded)
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  useEffect(() => {
    addUserToDB();
  }, [user]);

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
