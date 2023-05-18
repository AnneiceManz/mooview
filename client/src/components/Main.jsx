import React, { useEffect, useState } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import { Container, Header, Image, Segment } from "semantic-ui-react";
import axios from "axios";

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
      console.log("from main", movies);
      //if/else statement: if there is movie data AND the movie data array is more than zero --> setMovie to a random movie
      if (movies && movies.data.results.length > 0) {
        console.log("do we get to this point");
        setMovie(movies.data.results[randomIndex]);
        console.log("from main", movie);
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
    <div
      className="main-header"
      style={{
        backgroundImage: movie
          ? `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
          : null,
        backgroundSize: "cover"
      }}
    >
      {movie ? (
        <Segment basic>
          <Header></Header>
          <Header.Content>
            <h1 className="header-text header-movie-title">{movie.title}</h1>
            <h4 className="header-text header-release-date">{movie.release_date}</h4>
            <p className="header-text header-overview">{movie.overview}</p>
          </Header.Content>
        </Segment>
      ) : null}
    </div>
  );
};

export default Main;
