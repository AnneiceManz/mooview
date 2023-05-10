import React, { useState } from 'react';
import ListMovies from '../components/ListMovies';
import ListTV from '../components/ListTV'
import ListNowPlaying from '../components/List_Now_Playing';

const Home = () => {


    return (
        <div>
            <ListNowPlaying />
            <ListMovies />
            <ListTV />
        </div>
    );
};

export default Home;