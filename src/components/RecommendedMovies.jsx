import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { recommendedMoviesService } from "../services/movie.services";

import * as React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import Button from "@mui/material/Button";


function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function RecommendedMovies() {
  const navigate = useNavigate();

  const imageBaseURL = "https://image.tmdb.org/t/p/w300";

  //1. create -- Information state controller

  const [recommendedMovies, setRecommendedMovies] = useState(null);

  //2. useEffect to find info thoughts componentDidmounted
  useEffect(() => {
    getRecommendedMovies();
  }, []);

  //3. Async function. calls service function

  const getRecommendedMovies = async () => {
    try {
      const response = await recommendedMoviesService();
      const shuffledArr = shuffle(response.data)

      setRecommendedMovies(shuffledArr);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      } else {
        navigate("/error");
      }
    }
  };

  //4. Loading system
  if (!recommendedMovies) {
    return <h3>...Loading!!</h3>;
  }

  return (
    <ImageList sx={{ width: 500, height: 800 }}>
      <ImageListItem key="Subheader" cols={2}>
         <ListSubheader component="div" className="homeTitleBoxes">Recommended Movies</ListSubheader>
      </ImageListItem>
      {recommendedMovies.map((eachMovie) => (
        <ImageListItem key={eachMovie.id}>
          <img
            src={`${`${imageBaseURL}${eachMovie.poster_path}`}?w=248&fit=crop&auto=format`}
            //srcSet={`${`${imageBaseURL}${eachMovie.poster_path}`}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={eachMovie.original_title}
            loading="lazy"
          />
          <ImageListItemBar
            // title={eachMovie.original_title.slice(0, 20)}
            subtitle={
              // <span>
              //   <Link style={{ color: 'inherit', textDecoration: 'inherit'}} to={`/${eachMovie.id}/movie-details`}>More details</Link>
              // </span>
              <Button variant="contained" size="small" href={`/${eachMovie.id}/movie-details`}>
                More details
              </Button>
            }
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

export default RecommendedMovies;
