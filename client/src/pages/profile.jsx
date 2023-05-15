import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Image, Card } from "semantic-ui-react";
import Reviews from "../components/Reviews";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [userReviews, setUserReviews ] = useState(null)

  const getUserReviews =  async () => {
    try {
      const userId = user.sub
      const response = await fetch(`/api/reviews/user/${userId}`)
      const userReviews = await response.json()
      setUserReviews(userReviews)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    getUserReviews()
  }, [user])

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
          <Card.Group itemsPerRow={2}>
                {userReviews
                  ? userReviews.map((review) => {
                      return <Reviews key={review.review_id} review={review} />;
                    })
                  : null}
              </Card.Group>
        </div>
      </div>
    )
  );
};

export default Profile;
