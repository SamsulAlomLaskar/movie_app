import { Client, Databases, ID, Query } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const FAVOURITE_COLLECTION_ID = import.meta.env
  .VITE_APPWRITE_FAVOURITE_COLLECTION_ID;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCountHistory = async (searchedMovie, movie) => {
  //* 1 use appwrite SDK/API to check if the searchedMovie is already exists in the database
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchedMovie", searchedMovie),
    ]);

    //! 2 If exists, update the search count

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      });
      //* 3 If not, create a new document with search count 1
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchedMovie,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        movie_id: movie.id,
      });
    }
  } catch (error) {
    console.log("Error while checking search count history", error);
  }
};

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents;
  } catch (error) {
    console.log(error);
  }
};

export const updateFavouriteMovie = async (movieId, movie) => {
  //! 1 Check if the movie is already in the favourites collection
  let date = new Date();
  date = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      FAVOURITE_COLLECTION_ID,
      [Query.equal("id", movieId)]
    );

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.deleteDocument(
        DATABASE_ID,
        FAVOURITE_COLLECTION_ID,
        doc.$id
      );
    } else {
      await database.createDocument(
        DATABASE_ID,
        FAVOURITE_COLLECTION_ID,
        ID.unique(),
        {
          createdTimeStamp: date,
          id: movieId,
          title: movie.title,
          original_title: movie.original_title,
          overview: movie.overview,
          poster_path: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          backdrop_path: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          release_date: movie.release_date.split("-").reverse().join("-"),
          vote_average: movie.vote_average,
          adult: movie.adult,
          original_language: movie.original_language,
        }
      );
    }
  } catch (error) {
    console.log(error, "Error while updating favourite movie");
  }
  //* 2 If not added add the movie to the favourites collection
  //* 3 If already added, remove the movie from the favourites collection
};

export const getFavouriteMovies = async () => {
  try {
    if (localStorage.getItem("favourites")) {
      const localFavs = JSON.parse(localStorage.getItem("favourites"));
      if (localFavs.length > 0) {
        console.log("Favourite movies fetched from local storage", localFavs);
        return localFavs;
      }
    }
    const result = await database.listDocuments(
      DATABASE_ID,
      FAVOURITE_COLLECTION_ID
    );

    const favs = result.documents.map((doc) => ({
      id: doc.id,
      title: doc.title,
      original_title: doc.original_title,
      overview: doc.overview,
      poster_path: doc.poster_path,
      backdrop_path: doc.backdrop_path,
      release_date: doc.release_date,
      vote_average: doc.vote_average,
      adult: doc.adult,
      original_language: doc.original_language,
    }));

    return favs.sort((a, b) => a.release_date.localeCompare(b.release_date));
  } catch (error) {
    console.log(error);
  }
};
