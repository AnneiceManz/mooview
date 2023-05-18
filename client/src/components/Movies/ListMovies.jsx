import React, { useState, useEffect } from "react";
import Movie from "./MovieCard";
import { Card, Segment } from "semantic-ui-react";

const ListMovies = () => {
  // this is my original state with an array of students
  const [movies, setMovies] = useState(null);

  async function loadMovies() {
    // fetch the data from the backend
    const response = await fetch("/api/movie/popular/");
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
        <h2>Popular Movies</h2>
        <Segment className="list__movies" style={{ overflow: "auto" }}>
          <Card.Group itemsPerRow={6}>
            {movies
              ? movies.data.results.map((movie) => {
                  return <Movie key={movie.id} movie={movie} />;
                })
              : null}
          </Card.Group>
        </Segment>
      </div>
    </div>
  );
};

export default ListMovies;
