import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Grid,
  Image,
  Modal,
  Segment,
  Container,
  Header,
  Card,
  Icon,
} from "semantic-ui-react";
import Youtube from "react-youtube";
import Reviews from "../components/Reviews/Reviews";
import PostReview from "../components/Reviews/PostReview";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../components/Auth0/LoginButton";
import moment from "moment";
import LoginText from "../components/Auth0/LoginText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/PageElements/Footer";

const SingleMovie = () => {
  const location = useLocation();
  const movie_id = location.pathname;
  const { user, isAuthenticated } = useAuth0();

  console.log(`movie_id: ${movie_id}`);

  const [movieData, setMovieData] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
 
<div className=" h-[90vh]">
  {movieData ? (

<>
<div className="">
  <div className="absolute w-full h-[40vh] md:h-[70vh] bg-gradient-to-t from-black ">
    {" "}
  </div>
  <img
    src={`https://image.tmdb.org/t/p/original${
      movieData.data.backdrop_path || movieData.data.poster_path
    }`}
    alt=""
    className="w-full h-[40vh] md:h-[70vh] object-cover "
  />
</div>
<div className="flex justify-center ">
  <div className="flex flex-col items-center md:flex-row md:max-w-2xl lg:max-w-3xl absolute xl:max-w-4xl md:mt-[-400px] mt-[-300px] md:text-white ">
    <div className=" lg:w-[30%] h-auto md:h-[400px] w-[40%] ">
      <img
        className="w-[80%] md:w-[100%] h-full md:h-auto object-cover rounded-md m-auto"
        src={`https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`}
        alt=""
      />
    </div>
    <div className="w-[80%] m-auto text-center md:float-left md:w-[70%] md:pl-12 ">
      <p className="text-3xl md:text-5xl mb-3 mt-3 md:mt-0">
        {movieData.data.title || movieData.data.original_title}{" "}
      </p>
      <div className="flex flex-row justify-center items-center ">
        <div className="flex flex-row justify-center items-center mr-5 pb-2">
          <FontAwesomeIcon icon={faStar} className="text-3xl mr-2" />
          <p className="text-4xl ">
            {movieData?.data.vote_average?.toFixed(1)}{" "}
          </p>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-flow-col auto-cols-max gap-4 ">
            <p className="text-cyan-600 text-sm md:text-base">
              Released: {movieData?.data.release_date}{" "}
            </p>
            <p className="text-cyan-600 text-sm md:text-base">
              {movieData?.data.runtime} min
            </p>
          </div>

          <div className="grid grid-flow-col auto-cols-max gap-4 mb-3">
            {movieData.data.genres &&
              movieData.data.genres.slice(0, 5).map((genre, i) => (
                <span key={i} className="text-sm  md:text-base">
                  {genre.name}
                </span>
              ))}
          </div>
        </div>
      </div>

      <p className="md:text-gray-300 mb-8">{movieData.data.overview} </p>
      <div className="flex flex-row items-center ">
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
                            trigger={
                              <button className="rounded border md:bg-transparent md:text-white py-2 px-5">
                                Watch Trailer
                              </button>
                            }
                            dimmer="blurring"
                          >
                            <Modal.Content>
                              <Youtube
                                className="video"
                                videoId={trailer.key}
                              />
                            </Modal.Content>
                          </Modal>
{/* 
        <p onClick={saveShow} className=" cursor-pointer">
          {like ? (
            <FaHeart className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
          ) : (
            <FaRegHeart className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
          )}
        </p>
        <p>
          <GiShare className="text-gray-300 text-2xl ml-3 mb-8 md:mb-0" />
        </p>
        <p>
          <FiBookmark className="text-gray-300 text-2xl ml-3 mb-8 md:mb-0" />
        </p> */}
      </div>
    </div>
    <div>
    </div>
  </div>
</div>
    <div className=" relative top-[18vh] md:top-0">
      <div>
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
      </div>
      <div>
      {!isAuthenticated && (
        <>
          <span><LoginText /> to post a review!</span>
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

</>
  ) : null}
  <Footer />
</div>
  );
};

export default SingleMovie;




{/* <div className="single">
{movieData ? (
  <>
    <div className="movieInfoDiv">
      <div
        className="movieBackdrop"
        style={{
          background: `linear-gradient(180deg, rgba(0,0,0,0.3169861694677871) 33%, rgba(0,0,0,1) 69%), url(https://image.tmdb.org/t/p/w1280${movieData.data.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="movieInfoContainer">
        <Grid>
          <Grid.Row>
            <Grid.Column width={5}>
              <Image
                style={{ marginTop: "20px", width: "20rem" }}
                rounded
                src={`https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`}
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Segment padded textAlign="center" basic>
                <Grid relaxed>
                  <Grid.Row>

                      <h2 className="single-movie-title">
                        {movieData.data.title}
                      </h2>
             
                  </Grid.Row>

                  <Grid.Row width='equal'>
                    <Grid.Column>
                      <Header style={{color: "white", fontSize:'2em'}} as='h1' icon='star' content={movieData.data.vote_average.toFixed(1)} />
                    </Grid.Column>
                    <Grid.Column width={12} floated="right">
                      <Grid.Row>
                        <span className="single-movie-span">
                          Released:{" "}
                          {moment(movieData.data.release_date).format(
                            "MMM DD, YYYY"
                          )}{" "}
                        </span>
                        <span className="single-movie-span">
                          {movieData.data.runtime}
                          {" mins"}
                        </span>
                      </Grid.Row>
                      <Grid.Row>
                        {movieData.data.genres &&
                          movieData.data.genres
                            .slice(0, 5)
                            .map((genre, i) => (
                              <span
                                className="single-movie-genres"
                                key={i}
                              >
                                {genre.name}
                              </span>
                            ))}
                      </Grid.Row>
                    </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <div>
                      <p>{movieData.data.overview}</p>
                    </div>
                  </Grid.Row>
                  <Grid.Row>
                    <span>Starring: </span>
                  </Grid.Row>
                  <Grid.Row>
                    {movieData.data.credits.cast
                      .slice(0, 5)
                      .map((cast, i) => (
                        <Grid.Column width={3} key={i} centered>
                          <Image
                            style={{ width: "5rem", margin: 'auto' }}
                            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                          />
                          <span style={{fontSize: '0.9em'}}>{cast.name}</span>
                        </Grid.Column>
                      ))}
                  </Grid.Row>
                  <Grid.Row centered>
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
                      trigger={
                        <Button basic inverted size="small">
                          Watch Trailer
                        </Button>
                      }
                      dimmer="blurring"
                    >
                      <Modal.Content>
                        <Youtube
                          className="video"
                          videoId={trailer.key}
                        />
                      </Modal.Content>
                    </Modal>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    </div>
    <div className="reviews">
      <Segment padded="very" basic>
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
      <Segment textAlign="center" basic>
      {!isAuthenticated && (
        <>
          <span><LoginText /> to post a review!</span>
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
//       </Segment>
//     </div>
//   </>
// ) : null}
// </div> */}