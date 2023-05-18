import React, { useState, useEffect } from "react";
import { Card, Segment } from "semantic-ui-react";
import Movie from "./MovieCard";

const ListNowPlaying = () => {

  const [movies, setMovies] = useState(null);

  async function loadMovies() {
    // fetch the data from the backend
    const response = await fetch("/api/movie/now_playing/");
    const json = await response.json();
    setMovies(json);
    console.log("this is the json", json);
  }

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <div className="mybody">
      <div className="list-students">
        <h2>Now Playing</h2>
        <Segment className="list__movies" style={{ overflow: "auto" }}>
          <Card.Group itemsPerRow={6}>
            {movies
              ? movies.data.results.map((movie) => {
                  return <Movie key={movie.id} movie={movie} />;
                })
              : null}
            {/* // <li>{students ? students.data.results[0].original_title:null}</li> */}
          </Card.Group>
        </Segment>
      </div>
    </div>
  );
};

export default ListNowPlaying;
