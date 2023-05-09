import React from 'react';
import ListMovies from '../components/ListMovies';
import ListTV from '../components/ListTV'
import ListNowPlaying from '../components/List_Now_Playing';
import SingleMovie from '../components/SingleMovie';

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