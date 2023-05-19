import React from "react";
import ListMovies from "../components/Movies/ListMovies";
import ListNowPlaying from "../components/Movies/List_Now_Playing";
import Main from "../components/PageElements/Main";
import ListHorror from "../components/Movies/ListHorror";
import ListComedy from "../components/Movies/ListComedy";
import ListAction from "../components/Movies/ListAction";
import ListFantasy from "../components/Movies/ListFantasy";

const Home = () => {
  return (
    <div className="home-div">
      <Main />
      <ListNowPlaying />
      <ListMovies />
      <ListComedy />
      <ListFantasy />
      <ListAction />
      <ListHorror />
    </div>
  );
};

export default Home;
