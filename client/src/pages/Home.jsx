import React from "react";
import ListNowPlaying from "../components/Movies/List_Now_Playing";
import Main from "../components/PageElements/Main";
import ListHorror from "../components/Movies/ListHorror";
import ListComedy from "../components/Movies/ListComedy";
import ListAction from "../components/Movies/ListAction";
import ListFantasy from "../components/Movies/ListFantasy";
import Footer from "../components/PageElements/Footer";
import ListUpcoming from "../components/Movies/ListUpcoming";
import ListAnimated from "../components/Movies/ListAnimated";
import ListTopRated from "../components/Movies/ListTopRated";

const Home = () => {
  return (
    <div data-testid='home'>
    <div className="home-div">
      <Main />
      <ListUpcoming />
      <ListNowPlaying />
      <ListAnimated />
      <ListTopRated />
      <ListComedy />
      <ListFantasy />
      <ListAction />
      <ListHorror />
    </div>
    <Footer />
  </div>
  );
};

export default Home;
