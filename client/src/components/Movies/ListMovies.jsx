import React, { useState, useEffect, useRef } from "react";
import Movie from "./MovieCard";
import { motion } from "framer-motion";

const ListMovies = () => {
  const [movies, setMovies] = useState(null);
  const [width, setWidth] = useState(0);
  const carouselRef = useRef();

  async function loadMovies() {
    const response = await fetch("/api/movie/popular/");
    const json = await response.json();
    setMovies(json);
    console.log("this is the json", json);
  }
  useEffect(() => {
    loadMovies();
    setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
  }, []);

  return (
    <div className="movie-list-div">
      <motion.h2 animate={{ x: 50 }}>Popular</motion.h2>
      <motion.div
        ref={carouselRef}
        className="carousel"
        whileTap={{ curser: "grabbing" }}
      >
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="inner-carousel"
        >
          {movies
            ? movies.data.results.map((movie) => {
                return <Movie key={movie.id} movie={movie} />;
              })
            : null}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ListMovies;
