import { prisma } from "@/libs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const degrees = await prisma.degree.findMany()
    return NextResponse.json({ degrees })
  } catch (error) {
    console.log(error)
  }
}