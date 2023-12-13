import {groupBy, map, reduce, sortBy, sumBy } from "remeda";
import { prisma } from "./prisma";
import { StarRating } from "@prisma/client";

// hint:find all stars with the movies "included" on, then good ol' javascript should finish the job
// This one should require more javascript work than the previous ones
export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
   // groupBy groups them together
   // sumby is getting the total amount
   // all of this is on remeda

   // youre using n:number from the paramter as an if statement of the your total avg scores
   // if avg scores > n, show the movies

   // // *first get movieID,
   // // *then get the score for movieID 
   // *if movieID, filter out the score and then reduce
      // *for each id === movieID, find the score then reduce
      // *then divide the array by length
   // *then if movieId's avg score is over a certain threshold "n" then push the id to an array and return

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
         // return [...acc, ...map(ratings, rating => rating.movie)];
         // console.log(ratings, 'ratings');
         // console.log(ratings[0], 'ratings 0 ');
         // const movieIds = ratings.map((rating) => rating.movieId);
         // console.log(movieIds)
         // const findMovie = map(movieIds, (id) => Object.values(allMovies).find((m) => m.id === id))
         // console.log(findMovie, 'findMovie')
         // ? this code below works but gives an error??
         // return [...acc, ...findMovie];
         return [...acc, ratings[0].movie];
      }
      return acc;
   },
   [] as number[]
   );
   const sortedMovies = sortBy(moviesWithAvgScore, (movie) => movie)
   console.log(sortedMovies)
   return sortedMovies
   // return moviesWithAvgScore

};

