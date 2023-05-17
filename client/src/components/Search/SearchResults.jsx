import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SearchMovieCard from "./SearchMovieCard";
import { Container, Popup } from "semantic-ui-react";

const SearchResults = ({query}) => {
  const [movies, setMovies] = useState(null);

  const fetchMovies = async () => {
 const response = await fetch("/api/movie/search/" + props.query);
 const data = await response.json();
 const filterdMovies = data.results.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase()))
 setMovies(filterdMovies);
  };

  console.log("Here are the results", movies)

  useEffect(() => { 
    fetchMovies();
  })



  return (
 <Card.Group itemsPerRow={1}>
    {movies.map(movie => <SearchMovieCard key={movie.id} movie={movie} />)}
    </Card.Group>
  );
};

export default SearchResults;
