import React, { useEffect, useState } from "react";
import Movie from "../components/MovieCard";
import { useLocation } from "react-router-dom";
import { Card, Segment, Header } from "semantic-ui-react";

const Search = () => {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const query = location.pathname.split("/")[2];

  const getMovies = async () => {
    try {
      const response = await fetch(`/api/search/${query}`);
      const json = await response.json();
      setMovies(json);
      console.log("here are the search results", json);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [query]);

  return (
    <Segment>
        <Header textAlign="center"> Search Results</Header>
      <Card.Group itemsPerRow={3}>
        {movies
          ? movies.data.results.map((movie) => {
              return <Movie key={movie.id} movie={movie} />;
            })
          : null}
      </Card.Group>
    </Segment>
  );
};

export default Search;
