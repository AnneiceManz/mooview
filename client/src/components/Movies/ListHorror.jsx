import React, { useState, useEffect, useRef } from "react";
import Movie from "./MovieCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const ListHorror = () => {
  const [movies, setMovies] = useState(null);

  async function loadMovies() {
    // fetch the data from the backend
    const response = await fetch("/api/movie/horror/");
    const json = await response.json();
    setMovies(json);
  }
  
  useEffect(() => {
    loadMovies();
  }, []);

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  return (
    <div>
      <div className="flex flex-row items-center">
        <h2 className="text-black font-bold md:text-3xl p-4 cursor-pointer">
          Horror
        </h2>
      </div>
      <div className="relative flex items-center ml-2">
        <FontAwesomeIcon
          icon={faCircleChevronLeft}
          className="text-white rounded-full left-0 absolute opacity-80 hover:opacity-100 cursor-pointer z-10  hover:block text-4xl"
          onClick={slideLeft}
        />
        <div
          id="slider"
          className="w-full h-full overflow-x-scroll touch-auto hover:scroll-auto whitespace-nowrap scroll-smooth scrollbar-hide relative break-words"
        >
          {movies
            ? movies.data.results.map((movie) => {
                return <Movie key={movie.id} movie={movie} />;
              })
            : null}
        </div>
        <FontAwesomeIcon
          icon={faCircleChevronRight}
          className="text-white rounded-full right-0 absolute opacity-80 hover:opacity-100 cursor-pointer z-10  hover:block text-4xl"
          onClick={slideRight}
        />
      </div>
    </div>
  );
};

export default ListHorror;
