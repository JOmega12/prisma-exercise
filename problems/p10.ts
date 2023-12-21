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


   const users = await prisma.user.findMany()

   // console.log(users, 'users')

   const values = Object.values(users);
   console.log(values, 'val')

   // ? I think the test is asking my to update the array from prisma.user and delete all 
   const itemsGreaterThanN = values
   .filter((item) => item.age > n);
   // .filter((item) => item.age > n);
   console.log(itemsGreaterThanN, 'item')
   
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


   // const values = Object.values(users);
   // console.log(values, 'val')
   // .filter((item) => item.age > 20);
   // console.log(findUsersUnder20, 'over20')

};
