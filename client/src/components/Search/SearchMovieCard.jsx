import React from "react";
import { Icon, Image } from "semantic-ui-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SearchMovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <motion.div
      className="p-1.5 text-neutral-100 hover:bg-neautral-900 cursor-pointer"
      onClick={() => {
        handleClick();
      }}
    >
      <div className="flex h-16">
        <Image
        size="tiny"
          className="rounded aspect-[2/3]"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt="Couldn't find image"
        />
        <div className="flex-col ml-3">
          <p>{movie.title}</p>
          <p className="text-xs text-neutral-500 line-clamp-1">
            {movie.overview}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchMovieCard;
