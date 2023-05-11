import React, { useState } from 'react';
import ListMovies from '../components/ListMovies';
import ListNowPlaying from '../components/List_Now_Playing';

const Home = () => {


    return (
        <div>
            <ListNowPlaying />
            <ListMovies />
        </div>
    );
};

export default Home;