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

   // console.log(users, 'users')

   const values = Object.values(users);
   console.log(values, 'val')
   const itemsLessThanN = values
   .filter((item) => item.age < n ? item: null);
   console.log(itemsLessThanN, 'itemsLessThanN')



   // const deleteUsersOver20 =  users.map((user) => {
   //    const userOver20 = prisma.user.delete({
   //       where: {
   //          id: user.id,
   //          age: {
   //             gt: n
   //          }
   //       }
   //    })
   //    console.log(userOver20, 'user>20')
   // })


};
