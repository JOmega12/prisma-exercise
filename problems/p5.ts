import { groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {

   const allMoviesAvg = []
   // youre using n:number from the paramter as an if statement of the your total avg scores
   // if avg scores > n, show the movies

   // first get movieID,
   // then get the score for movieID 
      // if movieID, filter out the score and then reduce
      // then divide the array by length
   

   //this grabs all the object arrays where there is a movie
   const allMovies = await prisma.starRating.findMany({
      include: {
         movie: true,
      }
   }) 
   console.log(allMovies, 'allmovies')


   // this shows all the movies with their ID ONLY
   const filterMovieID = allMovies.map((item) => item.movieId);
   // console.log(filterMovieID, 'movieID')


   
   // const filterMovieID = Object.entries(allMovies.filter(item => item.movieId));
   // console.log(allMovies, 'all movies');
};

