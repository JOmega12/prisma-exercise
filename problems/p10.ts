import { prisma } from "./prisma";

// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {

   // const users = await prisma.user.update({
   //    select: {
   //       age: true
   //    },
   //    data: {
   //       age: {
   //          gt: n
   //       }
   //    }
   //    // data: {
   //    //    age: {
   //    //       deleteMany: {
   //    //          lt: n
   //    //       }
   //    //    }
   //    // }
   // })

   // return users;


   const users = await prisma.user.findMany({
      where: {
         age: {
            lt: n
         }
      }
   })
   console.log(users, 'users')

   const userIds = users.map((user) => user.id);
   const deleteUsers = await prisma.user.deleteMany({
      where:{
         id: {
            in: userIds
         }
      }
   })
   return deleteUsers;

   // const deleteUser = await prisma.user.delete({
   //    where:{
   //       id: 4934
   //    }
   // })

   // console.log(deleteUser, ' deleteUser')
   // return deleteUser;

   // return await prisma.user.deleteMany({
   //    where: {
   //       age: {
   //          lt: n
   //       }
   //    }
   // })


};
