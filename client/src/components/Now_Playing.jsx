import React from "react";
import { Card, Image } from "semantic-ui-react";

const NowPlaying = ({ movie }) => {
  return (
    <Card centered>
      <Image
        centered
        size="medium"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
      />
    </Card>
  );
};

export default NowPlaying;
