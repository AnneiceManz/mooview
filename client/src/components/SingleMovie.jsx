import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Icons } from 'semantic-ui-react'
import axios from 'react-axios'


const SingleMovie = () => {
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const movie_id = location.pathname;

    const [movieData, setMovieData] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [like, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    const fetchData = async () => {
        axios
        .get (`http//host:8080/api/movie/${movie_id}`)
        .then((response) => {
            setMovieData(response.data);
            const trailerId = response.data.videos.results.find(
                (vid) => vid.name === "Official Trailer"
            );
            setTrailer(trailerId ? trailerId : response.data.videos.results[0]);
        })
        .catch((error) => {
            console.log(error)
        })
    }
    console.log(movieData)

    useEffect(() => {
        fetchData();
    }, []);

    console.log("This is the poster path", movieData.data.poster_path)


    return (
        <div>
            <h2>Movie Data</h2>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`} />
        </div>
    );
};

export default SingleMovie;