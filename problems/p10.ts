import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {

   const findUsers = await prisma.user.findMany({
      where: {
         age: {
            lt: n
         }
      }
   })

   const usersToDeleteId = findUsers.map((item) => item.id)

   await prisma.starRating.deleteMany({
      where: {
         userId: {
            in: usersToDeleteId
         }
      }
   })

   await prisma.user.deleteMany({
      where:{
         id: {
            in: usersToDeleteId
         }
      }
   })

};
