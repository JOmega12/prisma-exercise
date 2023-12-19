import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {

   const userAge = await prisma.user.findMany({
      where: {
         age: {
            lt: n
         }
      }
   })

   const values = Object.values(userAge);
   console.log(values, 'values ')


};
