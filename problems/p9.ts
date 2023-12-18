import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {

   const allMovies = await prisma.user;
   console.log(allMovies, 'allMovies')

};
