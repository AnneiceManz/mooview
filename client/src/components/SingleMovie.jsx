import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Icons } from 'semantic-ui-react'


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
        try {
            const response = await fetch(`http://localhost:8080/api/movies`)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    

    return (
        <div>
            
        </div>
    );
};

export default SingleMovie;