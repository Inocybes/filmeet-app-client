import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/movie`
})


const getNowPlayingMovieService = () => {
  return service.get("/billboard")
}

const movieDetailsService = (id) => {
  // console.log(id);
  return service.get(`/movieDetails/${id}`)
}

const recommendedMoviesService = () => {
  return service.get("/recommendedMovies")
}

const getPopularMovieListDetailsService = (id) => {
  return service.get(`/${id}`)
}

const searchMovieService = (text) => {
  // console.log(text);
  return service.get(`/searchMovie/${text}`)
}

export {
  getNowPlayingMovieService,
  movieDetailsService,
  recommendedMoviesService,
  getPopularMovieListDetailsService,
  searchMovieService, 
} 