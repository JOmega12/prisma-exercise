import { prisma } from "./prisma";

// Get the average age of all users
// hint: the hot tub is hot, the water is great, to solve this problem you should "aggregate"
export const getAverageUserAge = async () => {

   const userAge = await prisma.user.findMany({
      select: {
         age: true
      }
   })

   const totalAge = userAge.reduce((total, user) => total + user.age, 0);

   const avgAge = totalAge / userAge.length;
   return avgAge;
};
