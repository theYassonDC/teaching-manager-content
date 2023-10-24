import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}
// export const prisma = global.prisma ?? new PrismaClient();
export const prisma = new PrismaClient({ log:  ['info'] }); 
if (process.env.NODE !== "production") global.prisma = prisma

