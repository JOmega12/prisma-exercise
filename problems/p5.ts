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

   const allMovies = await prisma.starRating.findMany({
      include: {
         movie:true
      }
   })

   return groups.map((item) => {
      const matchedMovies = allMovies.find((ele) => {
         return item.movieId === ele.movie.id
      } )
      return matchedMovies?.movie;
   })   

};




