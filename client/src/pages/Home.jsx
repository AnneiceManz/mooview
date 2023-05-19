import React from "react";
import ListMovies from "../components/Movies/ListMovies";
import ListNowPlaying from "../components/Movies/List_Now_Playing";
import Main from "../components/PageElements/Main";
import ListHorror from "../components/Movies/ListHorror";

const Home = () => {
  return (
    <div className="home-div">
      <Main />
      <ListNowPlaying />
      <ListMovies />
      <ListHorror />
    </div>
  );
};

export default Home;
