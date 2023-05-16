import React from "react";
import { Card, Grid, Icon, Image } from "semantic-ui-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SearchMovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const year=movie.release_date.split("-")

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };
  return (
    <Card
      onClick={() => {
        handleClick();
      }}
    >
        <Image
          className="rounded aspect-[2/3]"
          src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
          alt="Couldn't find image"
        />
        <Card.Content>

        <Card.Header>{movie.title}</Card.Header>
        <Card.Meta><Icon name="star"/>{`${movie.vote_average} • ${movie.vote_count.toLocaleString()} votes • ${year[0]}`}</Card.Meta>
        <Card.Description>
          {movie.overview}
        </Card.Description>
        </Card.Content>


    </Card>
  );
};

export default SearchMovieCard;
