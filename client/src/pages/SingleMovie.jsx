import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Grid,
  Image,
  Modal,
  Segment,
  Container,
  Header,
  Card,
} from "semantic-ui-react";
import Youtube from "react-youtube";
import Reviews from "../components/Reviews";
import PostReview from "../components/PostReview";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/LoginButton";

const SingleMovie = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movie_id = location.pathname;
  const { user, isAuthenticated } = useAuth0();

  console.log(`movie_id: ${movie_id}`);

  const [movieData, setMovieData] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [like, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reviews, setReviews] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api${movie_id}`);
      console.log(response);
      const movieData = await response.json();
      setMovieData(movieData);
      const trailerId = movieData.data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailerId ? trailerId : movieData.data.videos.results[0]);
      console.log("json", movieData);
    } catch (error) {
      console.log(error.message);
    }
  };

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
  console.log("movie data", movieData);
  console.log("review data", reviews);

  useEffect(() => {
    fetchData();
    fetchReviews();
  }, [movie_id]);

  return (
    <div className="movieInfoDiv">
      {movieData ? (
        <>
          <Container>
            <Grid>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Image
                    size="medium"
                    rounded
                    src={`https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`}
                  />
                </Grid.Column>
                <Grid.Column width={10}>
                  <Segment padded="very" textAlign="center">
                    <Grid>
                      <Grid.Row>
                        <div>
                          <h2>{movieData.data.title}</h2>
                        </div>
                      </Grid.Row>
                      <Grid.Row>
                        <div>
                          <span>Released: {movieData.data.release_date} </span>
                          <span>
                            {movieData.data.runtime}
                            {" mins"}
                          </span>
                        </div>
                      </Grid.Row>
                      <Grid.Row>
                        {movieData.data.genres &&
                          movieData.data.genres.slice(0, 5).map((genre, i) => (
                            <Grid.Column width={3} key={i}>
                              {genre.name}
                            </Grid.Column>
                          ))}
                      </Grid.Row>
                      <Grid.Row>
                        <div>
                          <p>{movieData.data.overview}</p>
                        </div>
                      </Grid.Row>
                      <Grid.Row>
                        <span>Starring: </span>
                        {movieData.data.credits.cast
                          .slice(0, 5)
                          .map((cast, i) => (
                            <Grid.Column width={4} key={i}>
                              {cast.name}
                            </Grid.Column>
                          ))}
                      </Grid.Row>
                      <Grid.Row></Grid.Row>
                      <Modal
                        size="small"
                        style={{
                          marginTop: "180px",
                          height: "auto",
                          width: "auto",
                        }}
                        onClose={() => setShowModal(false)}
                        onOpen={() => setShowModal(true)}
                        open={showModal}
                        trigger={<Button>Watch Trailer</Button>}
                        dimmer="blurring"
                      >
                        <Modal.Content>
                          <Youtube className="video" videoId={trailer.key} />
                        </Modal.Content>
                      </Modal>
                    </Grid>
                  </Segment>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
          <div>
            <Segment padded="very">
              <Header textAlign="center" as="h2">
                Reviews
              </Header>
              <Card.Group itemsPerRow={1}>
                {reviews
                  ? reviews.map((review) => {
                      return (
                        <Reviews
                          key={review.review_id}
                          review={review}
                          movieName={movieData.data.title}
                        />
                      );
                    })
                  : null}
              </Card.Group>
            </Segment>
            {!isAuthenticated && (
                <>
<span>Login to post a review!</span>
<LoginButton />
                </>
              )}
              {isAuthenticated && (

              <PostReview
                user={user.sub}
                movie_id={movie_id}
                movie_title={movieData.data.title}
              />
              )}
            {/* {!user ? null : (
            )} */}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SingleMovie;