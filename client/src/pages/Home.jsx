import React from "react";
import ListMovies from "../components/ListMovies";
import ListNowPlaying from "../components/List_Now_Playing";
import Main from "../components/Main";

const Home = () => {
  return (
    <div>
      <Main />
      <ListNowPlaying />
      <ListMovies />
    </div>
  );
};

export default Home;
