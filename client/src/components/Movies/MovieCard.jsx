import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";

const Movie = ({ movie }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <Card centered>
      <Image
        centered
        size="medium"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        onClick={handleClick}
      />
      <div className="overlay-icon">

          {movie.vote_average}{' '}<Icon name="star" color="yellow" />'s
      </div>
    </Card>
  );
};

export default Movie;
