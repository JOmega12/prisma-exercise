import {groupBy, map, reduce, sortBy, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
   //this grabs all the object arrays where there is a movie
   const allMovies = await prisma.starRating.findMany({
      include: {
         movie: true,
      }
   }) 

   console.log(allMovies, 'allmovies')
   const groupMovieId = groupBy(allMovies, item => item.movieId);

   const entries = Object.entries(groupMovieId);
   const moviesWithAvgScore = reduce(entries, (acc, [_movieIdkey, ratings]: [string, StarRating[]]) => {

      const avgScore = sumBy(ratings, (s) => s.score / ratings.length);
      if(avgScore > n) {
         // ? this code below works but gives an error??
         return [...acc, ratings[0].movie];
      }
      return acc;
   },
   [] as number[]
   );
   const sortedMovies = sortBy(moviesWithAvgScore, (movie) => movie)
   return sortedMovies

};




