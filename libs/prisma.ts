import { PrismaClient } from "@prisma/client";

declare global {
	var prisma: PrismaClient | undefined;
}
// export const prisma = global.prisma ?? new PrismaClient();
export const prisma = new PrismaClient() || global.prisma; 
if (process.env.NODE !== "production") global.prisma = prisma

