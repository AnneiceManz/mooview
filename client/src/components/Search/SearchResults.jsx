import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchMovieCard from "./SearchMovieCard";

const SearchResults = (props) => {
  const [movies, setMovies] = useState(null);
  const [results, setResults] = useState(false);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`/api/search/${props.search}`);
      const json = await response.json();
      const movieResults = json.data.results.slice(0, 5);
      console.log("movie results", movieResults);
      const movieCards = movieResults.map((movie, i) => {
        return <SearchMovieCard movie={movie} key={movie.id} />;
      });
      return movieCards;
    } catch (error) {
      console.log("Error fetching data: ", error);
      return [];
    }
  };

  console.log("Here are the results", movies)

  useEffect(() => {
    if (props.search.length === 0) return;

    fetchMovies(props.search).then((movieCards) => {
      setMovies(movieCards);
    });
  }, [props.search]);

  useEffect(() => {
    if (props.search.length === 0) {
      setResults(false);
    } else if (!props.search.isEmpty && movies.length === 0) {
      setResults(false);
    } else {
      setResults(true);
    }
  }, [movies]);

  return (
    <motion.div
      className="absolute top-12 w-full"
      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
    >
      {movies && results ? (
        <div className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px]">
          {movies}
        </div>
      ) : (
        <p className="bg-neutral-800 rounded drop-shadow-xl border-neutral-700 border-[1px] text-neutral-100 p-2">
          Nothing found
        </p>
      )}
    </motion.div>
  );
};

export default SearchResults;
