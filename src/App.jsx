import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContext";
import Favourites from "./components/pages/Favourites";
import TopRatedMovies from "./components/pages/TopRated";
import NowPlayingMovies from "./components/pages/NowPlaying";
import UpcomingMovies from "./components/pages/Upcoming";
import ScrollToTopButton from "./components/ScrollToTopButton";

const App = () => {
  return (
    <MovieProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourites />} />
          <Route path="/top-rated" element={<TopRatedMovies />} />
          <Route path="/now-playing" element={<NowPlayingMovies />} />
          <Route path="/upcoming" element={<UpcomingMovies />} />
        </Routes>
        <ScrollToTopButton />
      </main>
    </MovieProvider>
  );
};

export default App;
