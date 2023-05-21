import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Icon,
  Image,
  Confirm,
  Form,
  Rating,
} from "semantic-ui-react";
import UpdateReview from "./UpdateReview";
import CommentForm from "../Comments/CommentForm";
import { useLocation } from "react-router-dom";
import LoginText from "../Auth0/LoginText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Reviews = ({ movieName, movie_id }) => {
  const { user, isAuthenticated } = useAuth0();
  const currentUser = user?.sub;
  const [confirm, setConfirm] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [rating, setRating] = useState(0);
  const userId = user;
  const movieId = parseInt(movie_id.replace("/movie/", ""));
  const state = useLocation().state;

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews${movie_id}`);
      console.log(response);
      const reviewsData = await response.json();
      setReviews(reviewsData);
      console.log("reviews", reviews);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("review data", reviews);

  useEffect(() => {
    fetchReviews();
  }, [movie_id]);

  const [writeReview, setWriteReview] = useState(
    state || {
      user_id: userId,
      movie_id: movieId,
      title: "",
      post: "",
      star_rating: 0,
    }
  );

  const handleChange = (e) => {
    setWriteReview({ ...writeReview, [e.target.name]: e.target.value });
  };
  console.log(writeReview.star_rating, "stars!!!");

  const handleRate = (e, { rating }) => {
    setRating(rating);
    setWriteReview({
      ...writeReview,
      star_rating: rating,
    });
    console.log(rating, "stars");
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(writeReview),
      });
      window.location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };

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

  return (
    <div className="my-12">
      <h2>Reviews</h2>
      <div className="mt-10 md:grid flex-col grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* write review */}
        <div className="md:col-span-2 w-full flex flex-col gap-8 ">
          <h3 className="text-xl text-text font-semibold">
            Review "{movieName}"
          </h3>
          <p className="text-sm leading-7 font-medium text-border">
            Write a review for this movie. Tell me why I should or shouldn't
            watch it.
          </p>
          <div
            id="postSubmission"
            action="#postSubmission"
            className="grid grid-cols-1 gap-6"
          >
            <span>Rating: {rating} stars </span>
            <Rating
              icon="star"
              size="huge"
              maxRating={10}
              name="star_rating"
              onRate={handleRate}
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={writeReview.title}
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
            <textarea
              className="
        mt-1
        block
        w-full
        rounded-md
        bg-gray-100
        border-transparent
        focus:border-gray-500 focus:bg-white focus:ring-0
      "
              rows={4}
              placeholder="Review Post"
              name="post"
              value={writeReview.post}
              onChange={handleChange}
            />
            <Button.Group>
              <Button color="blue" id="submitPost" onClick={onSubmitForm}>
                Post
              </Button>
              <Button color="red" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </Button.Group>
          </div>
        </div>
        {/* REVIWERS */}
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">Reviews </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
            {reviews
              ? reviews.map((review) => {
                  return (
                    <div className="md:grid flex flex-col w-full grid-cols-10 gap-6 bg-dry p-4 border border-gray-100 shadow-xl rounded-lg">
                      <div className="col-span-10 flex flex-col gap-2 items-left">
                        <div className="grid flex flex-col grid-cols-7 grid-rows-2 gap-5 h-[35%] border-b-2">
                      <div className="col-span-2 row-span-2 bg-main hidden md:block">
                        <img
                          src={review.picture}
                          alt={review.username}
                          className="w-auto h-auto rounded-lg object-cover"
                        />
                      </div>
                          <div className="col-span-1 row-span-2 font-thin text-4xl text-center">
                            <FontAwesomeIcon icon={faStar} color="gold" />
                            <span>{review.star_rating}</span>
                          </div>
                          <div className="col-span-4">
                            <p className="text-3xl font-bold tracking-wider row-span-1 h-2">{review.title}</p>
                            <p className="text-slate-500 text-lg row-span-1">
                              {review.username}
                            </p>
                          </div>
                        </div>
                        <p className="text-xl leading-6 font-medium text-text">
                          {review.post}
                        </p>
                      </div>
                      {/* rates */}
                      <div>
                        {currentUser === review.user_id && (
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
                              content="Are you sure you want to delete this review?"
                              open={confirm}
                              onCancel={() => setConfirm(false)}
                              onConfirm={handleDelete}
                            />
                          </Button.Group>
                        )}
                      </div>

                      <CommentForm review_id={review.review_id} />
                    </div>
                  );
                })
              : null}
          </div>
          {!isAuthenticated && (
            <>
              <span>
                <LoginText /> to post a review!
              </span>
            </>
          )}
          {isAuthenticated && (
            <PostReview
              user={user.sub}
              movie_id={movie_id}
              movie_title={movieData.data.title}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
{
  /* // <>
  //   <Card centered>
  //     <Card.Content>
  //       <div>

  //       <Image 
  //       floated="left"
  //       circular
  //       size="tiny"
  //       src={review.picture}
  //       />
  //       </div>
  //       <Card.Header style={{fontSize: '1.8em'}}>{review.title}</Card.Header>
  //       <Card.Meta
  //         style={{ color: "red", fontWeight: "bold" }}
  //       >
  //         <span style={{ color: "#3977C9", marginLeft:'2px' }}>{review.username}</span>
  //       </Card.Meta>
  //       <Card.Meta>
  //         {review.star_rating} <Icon name="star" color="yellow" />
  //         's for {movieName}!
  //       </Card.Meta>
  //       <Card.Description><p className="pt-5">{review.post}</p></Card.Description>
  //     </Card.Content>
  //     {currentUser === review.user_id && (
  //       <Card.Content extra>
  //         <Button.Group size="tiny">
  //           <UpdateReview review={review} movieName={movieName} />
  //           <Button color="red" onClick={()=>setConfirm(true)}>
  //             Delete
  //           </Button>
  //           <Confirm 
  //           cancelButton="Never mind"
  //           confirmButton="Delete Review"
  //           content="Are you sure you want to delete this review?"
  //           open={confirm}
  //           onCancel={() => setConfirm(false)}
  //           onConfirm={handleDelete}
  //           />
  //         </Button.Group>
  //       </Card.Content>
  //     )}
  //   </Card>
  //   <CommentForm review_id={review.review_id} />
  // </>







    */
}
