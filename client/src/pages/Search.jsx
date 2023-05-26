import React, { useEffect, useState } from "react";
import Movie from "../components/Movies/MovieCard";
import { useLocation } from "react-router-dom";
import { Card } from "semantic-ui-react";
import IMAGES from "../images/IMAGES";

const Search = () => {
  const location = useLocation();
  const [movies, setMovies] = useState(null);
  const query = location.pathname.split("/")[2];

  const getMovies = async () => {
    try {
      const response = await fetch(`/api/search/${query}`);
      const json = await response.json();
      setMovies(json);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [query]);

  return (
    <div className="search-results-page">
      <img
        src={IMAGES.mooviewSearchHeader}
        alt="search"
        className="m-auto w-[25%]"
      />
      <h2> Search Results</h2>
      <Card.Group itemsPerRow={4} centered>
        {movies
          ? movies.data.results.map((movie) => {
              return <Movie key={movie.id} movie={movie} />;
            })
          : null}
      </Card.Group>
    </div>
  );
};

export default Search;
