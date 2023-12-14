import { maxBy, minBy } from "remeda";
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

   console.log(allMovies, 'allmovies')

   const userScore = allMovies.map((item) => item.score);
   // console.log(userScore, 'userScore')
   const totalScore = userScore.reduce((total, current) => {
      return total + current;
   }, 0)
   const averageScore = totalScore / userScore.length;


//   const userScores = allMovies.reduce((acc, item) => {
//     const userId = item.user.id;
//     const score = item.score;

//     if (!acc[userId]) {
//       acc[userId] = { totalScore: 0, count: 0 };
//     }

//     acc[userId].totalScore += score;
//     acc[userId].count += 1;

//     return acc;
//   }, {});

//   const averageScores = Object.keys(userScores).map((userId) => {
//     const userScore = userScores[userId];
//     return {
//       userId: parseInt(userId),
//       averageScore: userScore.totalScore / userScore.count,
//     };
//   });

//   const grumpiestUser = minBy(averageScores, (user) => user.averageScore);

//   if (grumpiestUser) {
//     return grumpiestUser.userId;
//   }

//   return null;

};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
   const allMovies = await prisma.starRating.findMany({
      include: {
         movie:true,
         user: true,
      }
   })



};
