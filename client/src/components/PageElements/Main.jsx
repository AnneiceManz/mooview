import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";
import moment from "moment";

const Main = () => {
  // this is my original state with an array of students
  const [movie, setMovie] = useState(null);

  const getRandomMovie = async () => {
    try {
      //get/fetch request from api
      const response = await fetch("/api/movie/popular/");
      // setting movies variable to json from api
      const movies = await response.json();
      // setting a variable to pick movie at random from api array using (movies.data.results.length) in order to access the results array from the returned json
      const randomIndex = Math.floor(
        Math.random() * movies.data.results.length
      );
      //if/else statement: if there is movie data AND the movie data array is more than zero --> setMovie to a random movie
      if (movies && movies.data.results.length > 0) {
        setMovie(movies.data.results[randomIndex]);
        //else console log "No movies found"
      } else {
        console.log("No Movies found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRandomMovie();
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const ReadMore = (text) => {
    const over = JSON.stringify(text);
    const overview = over
      .replace(/[^\w\s]/g, "")
      .replace(/(^\s+|\s+$)/g, "")
      .replace(/\s+/g, " ")
      .replace("children", "");
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };

    return (
      <p>
        {isReadMore ? overview.slice(0, 150) : overview}
        {overview.length > 150 && (
          <span
            onClick={toggleReadMore}
            className="text-gray-400 font-thin underline decoration-1 decoration-[#3977C9] cursor-pointer"
          >
            {isReadMore ? "...read more" : " ...show less"}
          </span>
        )}
      </p>
    );
  };

  return (
    <div data-testid='main' className="w-full h-[70vh] md:h-[600px] text-white">
      <div className="w-full h-full">
        <div className="absolute w-full h-[70vh] md:h-[600px] bg-gradient-to-r from-black">
          {" "}
        </div>
        <img
          className="w-full h-[70vh] md:h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt=""
        />
        <div className="absolute w-full top-[20%] p-4 md:p-16">
          <h1 className="text-2xl md:text-5xl font-bold">{movie?.title} </h1>
          <div className="my-4">
            <button
              onClick={handleClick}
              className=" rounded bg-[#C63729] text-white py-2 px-5"
            >
              More Info
            </button>
          </div>
          <p className="text-gray-400 text-base">
            Released: {movie?.release_date}{" "}
          </p>

          <p className="w-full sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] text-white text-sm md:text-lg mt-2">
            <ReadMore>{movie?.overview}</ReadMore>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
