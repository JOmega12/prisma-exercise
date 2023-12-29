import { prisma } from "./prisma";

// get average score for a user
export const getAverageScoreForUser = async (userId: number) => {

   // do this with aggregate
   const allMovies = await prisma.starRating.findMany({
      where : {
         userId: userId
      },
      include: {
         movie:true,
         user: true,
      }
   })

   const userScore = allMovies.map((item) => item.score);
   const totalScore = userScore.reduce((total, current) => {
      return total + current;
   }, 0)
   const averageScore = totalScore / userScore.length

   return averageScore
};
