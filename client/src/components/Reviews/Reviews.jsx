import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import {
  Button,
  Confirm,
  Rating,
} from "semantic-ui-react";
import UpdateReview from "./UpdateReview";
import CommentForm from "../Comments/CommentForm";
import { useLocation } from "react-router-dom";
import LoginText from "../Auth0/LoginText";

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
    <div className="mt-20 md:mt-0">
      <div className="mt-10 md:mt-0 md:grid flex-col grid-cols-5 gap-4 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* REVIWERS */}
        <div className="col-span-3 flex flex-col gap-6">
          <h3 className="text-4xl text-text font-thin text-center">Reviews </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-4 h-header overflow-y-scroll">
            {reviews
              ? reviews.map((review) => {
                  return (
                    <div className="md:grid flex flex-col w-full grid-cols-10 gap-6 bg-dry p-4 border border-gray-100 shadow-xl rounded-lg">
                      <div className="col-span-10 flex flex-col gap-2">
                        <div className="grid flex flex-col grid-clos-4 lg:grid-cols-8 lg:grid-rows-3 gap-5 h-[38%] place-items-center">
                          <div className=" col-span-1 lg:col-span-2 lg:row-span-2  m-auto">
                            <img
                              src={review.picture}
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
                      <div className="col-span-10 flex flex-col gap-2">
                        <CommentForm review_id={review.review_id} />
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
        {/* write review */}
        <div className="md:col-span-2 w-full flex flex-col gap-8 order-first ">
          <h3 className="text-xl text-text font-bold text-center">
            Review "{movieName}"
          </h3>
          <p className="text-lg leading-7 font-medium text-border">
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
            {!isAuthenticated && (
              <>
                <span>
                  <LoginText /> to post a review!
                </span>
              </>
            )}
            {isAuthenticated && (
                <Button color="blue" id="submitPost" onClick={onSubmitForm}>
                  Post
                </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
