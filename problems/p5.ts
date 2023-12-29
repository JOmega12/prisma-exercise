import {groupBy, map, reduce, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
   
   
   const groups = await prisma.starRating.groupBy({
      by: ['movieId'],
      having: {
         score: {
            _avg: {
               gt: n
            }
         }
      }
   })
   
   
   
   //this grabs all the object arrays where there is a movie
   const allMovies = await prisma.starRating.findMany({
      include: {
         movie: true,
      }
   }) 
   const groupMovieId = groupBy(allMovies, item => item.movieId);

   const entries = Object.entries(groupMovieId);
   const moviesWithAvgScore = reduce(entries, (acc, [_movieIdkey, ratings]: [string, StarRating[]]) => {

      const avgScore = sumBy(ratings, (s) => s.score / ratings.length);
      if(avgScore > n) {
         return [...acc, ratings[0].movieId];
      }
      return acc;
   },
   [] as number[]
   );

   const movieID = map(moviesWithAvgScore, (moviesId) => {
      console.log(moviesId, 'moviesId');
      return allMovies.find((rating) => rating.movieId === moviesId)?.movie
   })
   return movieID;
};




