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

/* 
adult:false
backdrop_path:"/a3F9cXjRH488qcOqFmFZwqawBMU.jpg"
id:1376434
original_language: "en"
original_title:"Predator: Killer of Killers"
overview:"This original animated"
popularity: 792.9766
poster_path: "/lbimIPTVsSlnmqSW5ngEsUxtHLM.jpg"
release_date:"2025-06-05"
title: "Predator: Killer of Killers"
vote_average: 8.063
vote_count:230
*/

export const updateFavouriteMovie = async (movieId, movie) => {
  //! 1 Check if the movie is already in the favourites collection

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
      console.log("Movie added to favourites successfully");
    }
  } catch (error) {
    console.log(error, "Error while updating favourite movie");
  }
  //* 2 If not added add the movie to the favourites collection
  //* 3 If already added, remove the movie from the favourites collection
};

export const getFavouriteMovies = async () => {
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      FAVOURITE_COLLECTION_ID
    );

    console.log("Favourite movies fetched successfully", result.documents);
    return result.documents;
  } catch (error) {
    console.log(error);
  }
};
