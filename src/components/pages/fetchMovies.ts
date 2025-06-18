const fetchMovies = async (path: string) => {
  let fetchedMovies: any = [];
  let errorMessage: string = "";
  const BASE_API_URL = import.meta.env.VITE_TMDB_API_BASE_URL;
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  const API_OPTIONS = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  const response = await fetch(`${BASE_API_URL}/${path}`, API_OPTIONS);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  const data = await response.json();

  if (data.Response === "False") {
    errorMessage = data.Error ?? "An error occurred while fetching movies";
    return errorMessage;
  }
  fetchedMovies = data.results ?? [];
  return { fetchedMovies, errorMessage };
};

export default fetchMovies;
