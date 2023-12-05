import { prisma } from "./prisma";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = () => {

   const allPG13Movies = prisma.movie.findMany({
      where: {
         parentalRating: "PG-13",
      },
      orderBy: {
         releaseYear: "desc",
      }
   })
   return allPG13Movies;
};
