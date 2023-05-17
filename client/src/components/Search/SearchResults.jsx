import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import SearchMovieCard from "./SearchMovieCard";

const SearchResults = ({ query }) => {

    const [movies, setMovies] = useState([]);

    const fecthMovies = async () => {
        try {
            const response = await fetch("/api/search/" + query);
            const data = await response.json();
            console.log('search data', data)
            setMovies(data);
            console.log('movies', movies)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fecthMovies();
    },[query]);

  return (
    <Card.Group>
      {movies.results.map((movie) => (
        <SearchMovieCard key={movie.id} movie={movie} />
      ))}
    </Card.Group>
  );
};

export default SearchResults;
