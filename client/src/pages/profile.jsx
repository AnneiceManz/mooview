import React, { useEffect, useState, use } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Image } from "semantic-ui-react";
import { Rating, Modal, Confirm } from "semantic-ui-react";
import IMAGES from "../images/IMAGES";
import UpdateReview from "../components/Reviews/UpdateReview";
import CommentForm from "../components/Comments/CommentForm";

const Profile = () => {
  const { user, isAuthenticated, logout } = useAuth0();
  const [reviews, setReviews] = useState(null);
  const [movieData, setMovieData] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [confirmDeleteUser, setConfirmDeleteUser] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const movieName = movieData?.title;

  const user_id = user.sub;
  console.log("user", user_id);

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    username: user.nickname,
    picture: user.picture,
  });

  const getUser = async () => {
    try {
      const userId = user_id;
      const response = await fetch(`/api/users/${userId}`);
      const userData = await response.json();
      setUserData(userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUserReviews = async () => {
    try {
      const userId = user_id;
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
    getUser();
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

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleDeleteUser = async () => {
    const user_id = user.sub;
    try {
      const response = await fetch(`/api/users/${user_id}`, {
        method: "DELETE",
      });
      handleLogout();
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${userData.user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      console.log("user updated", data);
      if (response.ok) {
        setUserData(data);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    isAuthenticated && (
      <div data-testid='profile' className="profile">
        <div className="sidebar">
          <Image
            avatar
            size="small"
            src={userData.picture ? userData.picture : IMAGES.mooview_logo3}
            alt={userData.name}
          />
          <div className="sidebarItem">
            <h2>{userData.username}</h2>
            <h3>{userData.name}</h3>
            <p>{userData.email}</p>
          </div>
          <div className="sidebarItem">
            <div className="sidebarButton">
              <Modal
                trigger={<Button>Update Profile</Button>}
                open={showModal}
                onClose={() => setShowModal(false)}
                onOpen={() => setShowModal(true)}
              >
                <Modal.Header>Update your profile</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <form className="grid grid-cols-1 gap-6">
                      <input
                        type="text"
                        value={userData.name}
                        name="name"
                        onChange={handleChange}
                        className="
                          mt-1
                          block
                          w-full
                          rounded-md
                          bg-gray-100
                          border-transparent
                          focus:border-gray-500 focus:bg-white focus:ring-0
                        "
                      />
                      <input
                        type="email"
                        value={userData.email}
                        name="email"
                        onChange={handleChange}
                        className="
                          mt-1
                          block
                          w-full
                          rounded-md
                          bg-gray-100
                          border-transparent
                          focus:border-gray-500 focus:bg-white focus:ring-0
        "
                      />
                      <input
                        type="text"
                        value={userData.username}
                        name="username"
                        onChange={handleChange}
                        className="
                          mt-1
                          block
                          w-full
                          rounded-md
                          bg-gray-100
                          border-transparent
                          focus:border-gray-500 focus:bg-white focus:ring-0
        "
                      />
                    </form>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button color="blue" onClick={onSubmitForm}>
                    Update
                  </Button>
                  <Button color="red" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
            <div className="sidebarButton">
              <Modal
                trigger={<Button>Delete Profile</Button>}
                open={confirmDeleteUser}
                onClose={() => setConfirmDeleteUser(false)}
                onOpen={() => setConfirmDeleteUser(true)}
                size="small"
              >
                <Modal.Header>
                  <p className="text-center text-red-500 text-3xl">
                    Are you sure you want to delete your account?
                  </p>
                </Modal.Header>
                <Modal.Content>
                  <Image
                    centered
                    size="medium"
                    src={IMAGES.mooviewQuestion}
                    wrapped
                  />
                  <Modal.Description>
                    <p className="text-center font-bold text-xl">
                      You will lose all your reviews and comments. This action
                      cannot be undone.
                    </p>
                  </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    color="blue"
                    onClick={() => setConfirmDeleteUser(false)}
                  >
                    Cancel
                  </Button>
                  <Button color="red" onClick={handleDeleteUser}>
                    Delete
                  </Button>
                </Modal.Actions>
              </Modal>
            </div>
          </div>
        </div>
        <div className="profileReviews">
          <div className="col-span-3 flex flex-col gap-6">
            <h3 className="text-4xl text-text font-thin text-center">
              My Reviews{" "}
            </h3>
            <div className="w-full flex flex-col bg-main  gap-6 rounded-lg md:p-12 p-4 h-header overflow-y-scroll">
              {reviews
                ? reviews.map((review) => {
                    return (
                      <div className="md:grid flex flex-col w-full grid-cols-10 gap-6 bg-dry p-4 shadow-md rounded-xl">
                        <div className="col-span-10 flex flex-col gap-2">
                          <div className="grid flex flex-col grid-clos-4 lg:grid-cols-8 lg:grid-rows-3 gap-5 h-[38%] place-items-center">
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
