import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import Favourites from "./components/pages/Favourites";
import TopRatedMovies from "./components/pages/TopRated";
import NowPlayingMovies from "./components/pages/NowPlaying";
import UpcomingMovies from "./components/pages/Upcoming";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourites />} />
          <Route path="/toprated" element={<TopRatedMovies />} />
          <Route path="/nowplaying" element={<NowPlayingMovies />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
        </Routes>
      </main>
    </MovieProvider>
  );
};

export default App;
