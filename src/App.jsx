import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/NavBar";
import Favourites from "./components/Favourites";

const App = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourite" element={<Favourites />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
