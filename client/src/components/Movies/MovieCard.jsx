import React from "react";
import { useNavigate } from "react-router-dom";
import { Icon} from "semantic-ui-react";

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="w-[180px] sm:w-[250px] md:w-[320px] lg:w-[320px] xl:w-[280px] inline-block cursor-pointer relative p-4 z-0">
      <img
        className="w-full h-auto hover:opacity-50 rounded"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} Poster`}
        onClick={handleClick}
      />
      <div className="absolute top-0 left-0 w-full hover:bg-black/40 opacity-0 hover:opacity-100 text-white px-5">
        <div className="flex flex-row justify-center items-center absolute top-8 right-8 text-gray-300">
          <Icon name="star" />
          <p className="text-xs md:text-base font-bold">{movie.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
