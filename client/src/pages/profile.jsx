import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Image } from "semantic-ui-react";
import { Rating, Modal, Confirm } from "semantic-ui-react";
import IMAGES from "../images/IMAGES";
import UpdateReview from "../components/Reviews/UpdateReview";
import CommentForm from "../components/Comments/CommentForm";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  const [reviews, setReviews] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const movieName = movieData?.title;

  const getUserReviews = async () => {
    try {
      const userId = user.sub;
      const response = await fetch(`/api/reviews/user/${userId}`);
      const reviews = await response.json();
      setReviews(reviews);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchMovieData = async () => {
    try {
      const response = await fetch(`/api${movie_id}`);
      console.log(response);
      const movieData = await response.json();
      setMovieData(movieData);
      console.log("json", movieData);
    } catch (error) {
      console.log(error.message);
    }
  };


  useEffect(() => {
    getUserReviews();
    fetchMovieData();
  }, [user]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/reviews/${review.review_id}`, {
        method: "DELETE",
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`/api/users/${user.sub}`, {
        method: "DELETE",
      });
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
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
              <Modal
              trigger={<Button>Delete Profile</Button>}
              open={confirmDeleteUser}
              onClose={() => setConfirmDeleteUser(false)}
              onOpen={() => setConfirmDeleteUser(true)}
              size="small"
              
              >
                <Modal.Header><p className="text-center text-red-500 text-3xl">Are you sure you want to delete your account?</p></Modal.Header>
                <Modal.Content>
                  <Image centered size='medium' src={IMAGES.mooviewQuestion} wrapped />
                  <Modal.Description>

                <p className="text-center font-bold text-xl">You will lose all your reviews and comments. This action cannot be undone.</p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                <Button color='blue' onClick={() => setConfirmDeleteUser(false)}>
                  Cancel
                </Button>
                <Button color='red' onClick={handleDeleteUser}>
                  Delete
                </Button>
                </Modal.Actions>
              </Modal>
            </div>
          </div>
        </div>
        <div className="profileReviews">
          <h2>My Reviews</h2>
          <div className="col-span-3 flex flex-col gap-6">
            <h3 className="text-4xl text-text font-thin text-center">
              Reviews{" "}
            </h3>
            <div className="w-full flex flex-col bg-main  gap-6 rounded-lg md:p-12 p-4 h-header overflow-y-scroll">
              {reviews
                ? reviews.map((review) => {
                    return (
                      <div className="md:grid flex flex-col w-full grid-cols-10 gap-6 bg-dry p-4 shadow-md rounded-xl">
                        <div className="col-span-10 flex flex-col gap-2">
                          <div className="grid flex flex-col grid-clos-4 lg:grid-cols-8 lg:grid-rows-3 gap-5 h-[38%] place-items-center">
                            <div className=" col-span-1 lg:col-span-2 lg:row-span-2  m-auto">
                              <img
                                key={review.review_id}
                                src={
                                  review.picture
                                    ? review.picture
                                    : IMAGES.mooview_logo3
                                }
                                alt={review.username}
                                className="w-[80px] lg:w-[104px] h-auto rounded-full hidden md:block"
                              />
                              <p className="text-slate-500 text-lg row-span-1">
                                {review.username}
                              </p>
                            </div>

                            <div className="col-span-2 lg:col-span-3 lg:row-span-3 text-center ">
                              <p className="hidden lg:block lg:text-3xl font-bold tracking-wider">
                                {review.title}
                              </p>
                            </div>
                            <div className=" col-span-2 lg:col-span-3 lg:row-span-3 lg:text-4xl text-right m-4">
                              <Rating
                                icon="star"
                                color="yellow"
                                disabled
                                maxRating={10}
                                rating={review.star_rating}
                              />
                            </div>
                          </div>
                          <p className="text-xl leading-6 font-medium">
                            {review.post}
                          </p>
                        </div>
                        {/* rates */}
                        <div>
                          <Button.Group size="tiny">
                            <UpdateReview
                              review={review}
                              movieName={movieName}
                            />
                            <Button
                              color="red"
                              onClick={() => setConfirm(true)}
                            >
                              Delete
                            </Button>
                            <Confirm
                              cancelButton="Never mind"
                              confirmButton="Delete Review"
                              header="Are you sure you want to delete this review?"
                              content={
                                <img
                                  className="w-[50%] m-auto"
                                  src={IMAGES.mooviewQuestion}
                                />
                              }
                              size="tiny"
                              open={confirm}
                              onCancel={() => setConfirm(false)}
                              onConfirm={handleDelete}
                            />
                          </Button.Group>
                        </div>
                        <div className="col-span-10 flex flex-col gap-2">
                          <CommentForm review_id={review.review_id} />
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
