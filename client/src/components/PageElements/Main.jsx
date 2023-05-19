import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import moment from "moment";

const Main = () => {
  // this is my original state with an array of students
  const [movie, setMovie] = useState(null);

  const getRandomMovie = async () => {
    try {
      //get/fetch request from api
      const response = await fetch("/api/movie/popular/");
      // setting movies variable to json from api
      const movies = await response.json();
      // setting a variable to pick movie at random from api array using (movies.data.results.length) in order to access the results array from the returned json
      const randomIndex = Math.floor(
        Math.random() * movies.data.results.length
      );
      //if/else statement: if there is movie data AND the movie data array is more than zero --> setMovie to a random movie
      if (movies && movies.data.results.length > 0) {
        setMovie(movies.data.results[randomIndex]);
        //else console log "No movies found"
      } else {
        console.log("No Movies found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomMovie();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Container className="main-container">
      <div
        className="main-header"
        style={{
          backgroundImage: movie
            ? `linear-gradient(90deg, rgba(0,0,0,0.9360337885154062) 33%, rgba(0,0,0,0.17973126750700286) 69%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
            : null,
        }}
      ></div>
      <div className="main-header-overlay">
        {movie ? (
          <Segment basic padded>
            <Header.Content>
              <h1 className="header-text header-movie-title">{movie.title}</h1>
              <Button color="red" onClick={handleClick}>
                More Info
              </Button>
              <div style={{ paddingTop: "20px" }}>
                <h4 className="header-text header-release-date">
                  {moment(movie.release_date).format("MMM DD, YYYY")}
                </h4>
                <p className="header-text header-overview">{movie.overview}</p>
              </div>
            </Header.Content>
          </Segment>
        ) : null}
      </div>
    </Container>
  );
};

export default Main;
