import { groupBy, map } from "remeda";
import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {

   const allMovies = await prisma.starRating.findMany({
      include: {
         user: true,
      }
   });
   // console.log(allMovies, 'allMovies')

   const groupByUserId = groupBy(allMovies ,(user) =>user.userId);
   
   const values = Object.values(groupByUserId);

   // return map(values ,(items) => {
   //    // console.log(items);
   //    return items.map((ele) => {
   //       if(ele.userId === userId) {
   //          ele.user.username = newUsername
   //       }
   //    })
   // })

   // for(const items of values) {
   //    for(const ele of items) {
   //       if(ele.userId === userId) {
   //          ele.user.username = newUsername
   //          break;
   //       }
   //    }
   // }

   values.forEach((item) => {
      console.log(item, 'item')
   })
};
