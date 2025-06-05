import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Favourites from "./components/Favourites";

const App = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favourite" element={<Favourites />} />
      </Routes>
    </main>
  );
};

export default App;
