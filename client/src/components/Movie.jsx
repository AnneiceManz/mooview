import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Card, Image } from 'semantic-ui-react'

const Movie = ({movie}) => {
 
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/movie/${movie.id}`)
    }

    return (
        <Card centered>
            <Image centered size='medium' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} onClick={handleClick}/>
        </Card>
    )

}

export default Movie;