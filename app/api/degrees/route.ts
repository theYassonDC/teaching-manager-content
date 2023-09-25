import { prisma } from "@/libs";
import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
export async function GET() {
  const prismaCliente = new PrismaClient()
  try {
    const degrees = await prismaCliente.degree.findMany()
    return NextResponse.json({ degrees })
  } catch (error) {
    console.log(error)
  }
}