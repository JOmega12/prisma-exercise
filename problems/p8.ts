import { groupBy, map, maxBy, minBy } from "remeda";
import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {

   const allMovies = await prisma.starRating.findMany({
      include: {
         movie:true,
         user: true,
      }
   })

   const groupByUserId = groupBy(allMovies, (item) => item.userId);

   const values = Object.values(groupByUserId);

   const userAverage = map((values), ratings => {
      const userScore = ratings.map((item) => item.score);
      const totalScore = userScore.reduce((total, current) => {
         return total + current;
      }, 0) / userScore.length
      return {userId: ratings[0].userId, username: ratings[0].user.username, totalScore}
   })
   const badReview = minBy(userAverage, user => user.totalScore);
   return badReview?.userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
   const allMovies = await prisma.starRating.findMany({
      include: {
         movie:true,
         user: true,
      }
   })

   const groupByUserId = groupBy(allMovies, (ratings) => ratings.userId);
   const values = Object.values(groupByUserId);

   const userAverage = map((values), ratings => {
      const userScore = ratings.map((item) => item.score);
      const totalScore = userScore.reduce((total, current) => total + current) / userScore.length;
      return {userId: ratings[0].userId, username: ratings[0].user.username ,totalScore};
   })

   const nicePerson = maxBy((userAverage), (user) => user.totalScore);
   return nicePerson?.userId;
};
