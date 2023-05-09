import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'


const SingleMovie = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const movie_id = location.pathname;
    
    console.log(`movie_id: ${movie_id}`)
    
    const [movieData, setMovieData] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [like, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api${movie_id}`)
            console.log(response)
            const movieData = await response.json();
            setMovieData(movieData)
            console.log("json" , movieData)
            const trailerId = await response.data.videos.results.find(
                    (vid) => vid.name === "Official Trailer"
                )
                setTrailer(trailerId ? trailerId : response.data.videos.results[0]);
            } catch (error) {
                console.log(error.message)
            }
        }
        console.log("movie data", movieData)

    useEffect(() => {
        fetchData();
    }, [movie_id]);



    return (
        <div>
            {movieData ? <img src={`https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`} />: null}
            <h2>{movieData.data.title}</h2>
        </div>
    );
};

export default SingleMovie;