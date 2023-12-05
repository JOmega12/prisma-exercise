import { prisma } from "./prisma";

// Hint: look up "orderBy"
// get an array of all users
export const getAllUsers = async () => {

   // look at video 2 to get the idea of getting the data from prisma
   // I would also be looking at the seed and reseed ts files to see how it can be used
   const allUsers = await prisma.user.findMany({
      orderBy: {
         username: 'asc'
      }
   })

   return allUsers;
};
