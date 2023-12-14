import { prisma } from "./prisma";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {

   const allMovies = await prisma.starRating.findMany({
      where : {
         userId: userId
      },
      include: {
         movie:true,
         user: true,
      }
   })

   const movieArray = allMovies.map((item) => {
      if(userId === item.user.id) {
         return item.movie
      }
   })

   return movieArray;
};
