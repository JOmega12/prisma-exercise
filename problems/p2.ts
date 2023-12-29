import { prisma } from "./prisma";

// We want to grab the first N youngest users
// hint: The garden has leaves, I think you should rake, to give me an answer, first you should "take"
export const getNYoungestUsers = (howManyUsersToGrab: number) => {


   // from the hint, get all the user ages, then "take" the age that is lowest among the array of users
   return prisma.user.findMany({
      take: howManyUsersToGrab,
      orderBy: {
         age: "asc"
      },

   })
};
