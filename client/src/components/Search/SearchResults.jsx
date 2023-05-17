import React from "react";
import { Card } from "semantic-ui-react";
import SearchMovieCard from "./SearchMovieCard";

const SearchResults = ({ results }) => {
  return (
    <Card.Group>
      {results.map((movie) => (
        <SearchMovieCard key={movie.id} movie={movie} />
      ))}
    </Card.Group>
  );
};

export default SearchResults;
