import React from "react";
import ListMovies from "../components/Movies/ListMovies";
import ListNowPlaying from "../components/Movies/List_Now_Playing";
import Main from "../components/PageElements/Main";
import ListHorror from "../components/Movies/ListHorror";
import ListComedy from "../components/Movies/ListComedy";
import ListAction from "../components/Movies/ListAction";
import ListFantasy from "../components/Movies/ListFantasy";
import Footer from "../components/PageElements/Footer";
import ListUpcoming from "../components/Movies/ListUpcoming";
import ListAnimated from "../components/Movies/ListAnimated";

const Home = () => {
  return (
    <>
    <div className="home-div">
      <Main />
      <ListUpcoming />
      <ListNowPlaying />
      <ListAnimated />
      <ListMovies />
      <ListComedy />
      <ListFantasy />
      <ListAction />
      <ListHorror />
    </div>
    <Footer />
  </>
  );
};

export default Home;
