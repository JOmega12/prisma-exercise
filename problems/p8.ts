import { prisma } from "./prisma";

// Always tell truths, don't you ever lie, to solve this problem, just try a `groupBy`

// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
   // groups users by their avg score and return the minimum/ maximum of that 
   const groups = await prisma.starRating.groupBy({
      by: ["userId"],
      _avg: {
         score: true
      },
      orderBy: {
         _avg: {
            score: 'asc'
         }
      }
   })
   return groups[0].userId;
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
   const groups = await prisma.starRating.groupBy({
      by: ["userId"],
      _avg: {
         score: true
      },
      orderBy: {
         _avg: {
            score: 'desc'
         }
      }
   })
   return groups[0].userId;
};
