import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import { Icons } from 'semantic-ui-react'
// import axios from 'react-axios'


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

    // const fetchData = async () => {
    //     .get (`http//host:8080/api/movie/${movie_id}`)
    //     .then((response) => {
    //         setMovieData(response.data);
    //         const trailerId = response.data.videos.results.find(
    //             (vid) => vid.name === "Official Trailer"
    //         );
    //         setTrailer(trailerId ? trailerId : response.data.videos.results[0]);
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api${movie_id}`)
            console.log(response)
            const movieData = await response.json();
            setMovieData(movieData)
            console.log("json" , movieData)
            // const trailerId = await response.data.videos.results.find(
            //     (vid) => vid.name === "Official Trailer"
            // )
            // setTrailer(trailerId ? trailerId : response.data.videos.results[0]);
        } catch (error) {
            console.log(error.message)
        }
    }
    console.log("movie data", movieData)


    // async function loadDetails() {
    //     // fetch the data from the backend
    //     const response = await fetch(
    //       `http://localhost:8080/api/movie/:movie_id`
    //     );
    //     const json = await response.json();
    //     setMovieData(json);
    //     console.log("this is the json", json);
    //   }

    useEffect(() => {
        fetchData();
    }, [movie_id]);

    console.log("This is the poster path", movieData.poster_path)


    return (
        <div>
            <h2>Movie Data</h2>
            {movieData ? <img src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} />: null}
{/* <img src={`https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`} /> */}
        </div>
    );
};

export default SingleMovie;