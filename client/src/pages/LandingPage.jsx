import React from "react";
import IMAGES from "../images/IMAGES";
import ListNowPlaying from "../components/List_Now_Playing";
import { Image } from "semantic-ui-react";
import LoginButton from "../components/LoginButton";

const LandingPage = () => {
  return (
    <div>
      <div>
        <LoginButton />
        <Image centered size="large" src={IMAGES.mooview_logo} />
      </div>
      <ListNowPlaying />
    </div>
  );
};

export default LandingPage;
