import React, { useEffect, useState } from 'react';
import Movie from '../components/MovieCard';
import { useSearchParams } from 'react-router-dom';
import { Card, Segment } from 'semantic-ui-react';

const Search = () => {

    const [searchParams]=useSearchParams(); 

    const [movies, setMovies] = useState(null);
    const query = searchParams.get("query");

    const getMovies = async () => {
        try {
            const response = await fetch(`/api/search/${query}`);
            const json = await response.json();
            setMovies(json)
            console.log('here are the search results', json)
        } catch (error) {
            console.log('Error fetching data: ', error);
        }
    }

    useEffect(() => {
        getMovies();
    },[query])

    return (
        <Segment className="list__movies" style={{ overflow: "auto" }}>
        <Card.Group itemsPerRow={6}>
          {movies
            ? movies.data.results.map((movie) => {
                return <Movie key={movie.id} movie={movie} />;
              })
            : null}
        </Card.Group>
      </Segment>
    );
};

export default Search;