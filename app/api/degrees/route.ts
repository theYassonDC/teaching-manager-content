import { prisma } from "@/libs";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const degrees = await prisma.degree.findMany()
    return NextResponse.json({ degrees }, {status: 404})
  } catch (error) {
    console.log(error)
  }
}