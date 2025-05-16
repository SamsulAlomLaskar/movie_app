import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(`Movie: ${title} - Liked: ${hasLiked}`);
  }, [hasLiked]);

  return (
    <div className="card" onClick={() => setCount(count + 1)}>
      <h2>
        Movie: {title} <br /> {count || null}
      </h2>
      <button onClick={() => setHasLiked(!hasLiked)}>
        {hasLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="card-container">
      <Card title="12th Fail" />
      <Card title="Lapata Ladies" />
      <Card title="Jawan" />
      <Card title="Avatar the way of water" />
    </div>
  );
};

export default App;
