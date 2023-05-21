import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="w-[180px] sm:w-[250px] md:w-[280px] lg:w-[280px] xl:w-[320px] inline-block cursor-pointer relative p-4 z-0 group">
      <img
        className="w-full h-auto hover:opacity-50 rounded"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        onClick={handleClick}
      />
      <div
        onClick={handleClick}
        className="absolute top-0 left-0 w-full group-hover:bg-black/40  text-white px-5"
      >
        <div className="flex flex-row justify-center items-center absolute top-8 right-8 opacity-0 group-hover:opacity-100 text-gray-300">
          <FontAwesomeIcon icon={faStar} />
          <p className="text-lg md:text-3xl font-bold">{movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
