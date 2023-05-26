import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Modal } from "semantic-ui-react";
import Youtube from "react-youtube";
import Reviews from "../components/Reviews/Reviews";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/PageElements/Footer";

const SingleMovie = () => {
  const location = useLocation();
  const movie_id = location.pathname;
  const [movieData, setMovieData] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api${movie_id}`);
      const movieData = await response.json();
      setMovieData(movieData);
      const trailerId = movieData.data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailerId ? trailerId : movieData.data.videos.results[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [movie_id]);

  return (
    <div className=" h-[90vh]">
      {movieData ? (
        <>
          <div className="">
            <div className="absolute w-full md:h-[45vh] lg:h-[70vh] bg-gradient-to-t from-black ">
              {" "}
            </div>
            <img
              src={`https://image.tmdb.org/t/p/original${
                movieData.data.backdrop_path || movieData.data.poster_path
              }`}
              alt=""
              className="w-full md:h-[45vh] lg:h-[70vh]  object-cover "
            />
          </div>
          <div className="flex justify-center ">
            <div className="flex flex-col items-center md:flex-row md:max-w-4xl lg:max-w-3xl absolute xl:max-w-4xl md:mt-[-550px] mt-[-200px] md:text-white ">
              <div className=" lg:w-[30%] h-[auto] md:w-[220px] w-[200px] ">
                <img
                  className="w-[80%] md:w-[90%] h-full md:h-auto object-cover rounded-md m-auto"
                  src={`https://image.tmdb.org/t/p/w500${movieData.data.poster_path}`}
                  alt=""
                />
              </div>
              <div className="w-[80%] m-auto text-center md:float-left md:w-[70%] md:pl-12 ">
                <p className="text-3xl md:text-5xl mb-3 mt-3 md:mt-0">
                  {movieData.data.title || movieData.data.original_title}{" "}
                </p>
                <div className="flex flex-row justify-center items-center ">
                  <div className="flex flex-row justify-center items-center mr-5 pb-2">
                    <FontAwesomeIcon icon={faStar} className="text-3xl mr-2" />
                    <p className="text-4xl ">
                      {movieData?.data.vote_average?.toFixed(1)}{" "}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="grid grid-flow-col auto-cols-max gap-4 ">
                      <p className="text-cyan-300 text-sm md:text-base">
                        Released: {movieData?.data.release_date}{" "}
                      </p>
                      <p className="text-cyan-300 text-sm md:text-base">
                        {movieData?.data.runtime} min
                      </p>
                    </div>

                    <div className="grid grid-flow-col auto-cols-max gap-4 mb-3">
                      {movieData.data.genres &&
                        movieData.data.genres.slice(0, 5).map((genre, i) => (
                          <span key={i} className="text-sm  md:text-base">
                            {genre.name}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>
                <p className="md:text-gray-300 mb-8 row-span-1">
                  {movieData.data.overview}{" "}
                </p>
                <div className="justify-center items-start grid grid-flow-col auto-cols-max gap-2 mb-1">
                  {movieData.data.credits.cast.slice(0, 5).map((cast, i) => (
                    <div className="w-[4em] mx-2.5" key={i}>
                      <img
                        className="w-[4em] rounded-md"
                        src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                      />
                      <span className="">{cast.name}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row items-center ">
                  <Modal
                    size="small"
                    style={{
                      marginTop: "180px",
                      height: "auto",
                      width: "auto",
                    }}
                    onClose={() => setShowModal(false)}
                    onOpen={() => setShowModal(true)}
                    open={showModal}
                    trigger={
                      <button className="rounded border md:bg-transparent md:text-white py-2 px-5">
                        Watch Trailer
                      </button>
                    }
                    dimmer="blurring"
                  >
                    <Modal.Content>
                      <Youtube className="video" videoId={trailer.key} />
                    </Modal.Content>
                  </Modal>
                  {/* 
        <p onClick={saveShow} className=" cursor-pointer">
          {like ? (
            <FaHeart className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
          ) : (
            <FaRegHeart className="text-gray-300 text-2xl ml-6 mb-8 md:mb-0" />
          )}
        </p>
        <p>
          <GiShare className="text-gray-300 text-2xl ml-3 mb-8 md:mb-0" />
        </p>
        <p>
          <FiBookmark className="text-gray-300 text-2xl ml-3 mb-8 md:mb-0" />
        </p> */}
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex grid w-full pt-20 mt-60 md:mt-0 md:pt-0">
              <Reviews movieName={movieData.data.title} movie_id={movie_id} />
            </div>
          </div>
        </>
      ) : null}
      <Footer />
    </div>
  );
};

export default SingleMovie;
