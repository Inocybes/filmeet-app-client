import NowPlayingMovies from "../components/NowPlayingMovies";
import RecommendedMovies from "../components/RecommendedMovies";

function Home() {
  return (
    <div className="homePositionLists">
      <div>
        <NowPlayingMovies />
      </div>
      <div>
        <RecommendedMovies />
      </div>
    </div>
  );
}
export default Home;
