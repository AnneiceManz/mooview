import React from 'react';
import ListMovies from '../components/ListMovies';
import ListTV from '../components/ListTV'

const Home = () => {
    return (
        <div>
            <ListMovies />
            <ListTV />
        </div>
    );
};

export default Home;