import { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import MeetUpMovie from "../components/MeetUpMovie";
import { movieDetailsService } from "../services/movie.services";
import { getMeetUpById } from "../services/meetUpList.services.js";

import * as React from "react";


function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState(null);
  // const [ meetUpListMovie, setMeetUpListMovie ] = useState(null)
  const [meetUpList, setMeetupList] = useState([]);
  const imageBaseURL = "https://image.tmdb.org/t/p/w300";

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getMovieDetails();
    getMeetUpMovieId();
  }, []);

  const getMovieDetails = async () => {
    try {
      const response = await movieDetailsService(id);
      setMovieDetails(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  const getMeetUpMovieId = async () => {
    try {
      const response = await getMeetUpById(id);
      setMeetupList(response.data);
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 500) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  if (!movieDetails) {
    return <h3>...Loading</h3>;
  }

  return (
    <div >
      <div className="movieDetailsBox">
        <img
          class="card-img-top"
          src={`${imageBaseURL}${movieDetails.poster_path}`}
          alt={movieDetails.original_title}
          
        />
        <div class="card-body">
          <h2 class="card-title">{movieDetails.original_title}</h2>
          <h3>Release date: </h3>
          <p class="card-text">{movieDetails.release_date}</p>
          <h3>Overview: </h3>
          <p class="card-text">{movieDetails.overview}</p>
        </div>
      </div>
      <div>
        <div class="MeetUpMoviesComponent">
          <MeetUpMovie id={id} />
        </div>

        {/* <div>
          <h3>Meet Up's</h3>

          {meetUpList.map((eachList) => {
            return <p>{eachList.title}</p>;
          })}
        </div> */}
      </div>
    </div>
  );
}

export default MovieDetails;

