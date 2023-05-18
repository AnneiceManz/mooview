import React from "react";
import ListMovies from "../components/Movies/ListMovies";
import ListNowPlaying from "../components/Movies/List_Now_Playing";
import Main from "../components/PageElements/Main";

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
