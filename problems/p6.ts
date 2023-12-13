import { groupBy, map } from "remeda";
import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
   
   // have the userId from the prop and then show the array of movieIds and then write down 

   // if userId === movie userId then show movie object

   const allMovies = await prisma.starRating.findMany({
      include: {
         movie:true,
         user: true,
      }
   })

   const groupedMoviesId = groupBy(allMovies, m => m.movieId);
   const groupedUser = map(allMovies, m => m.user.id)
   console.log(groupedUser)

   const entries = Object.entries(groupedMoviesId);
   console.log(entries);
   
};
