import { NextResponse } from "next/server";
import { prisma } from "@/libs";

export async function GET() {
  try {
    const degrees = await prisma.degree.findFirst()
    return NextResponse.json({ degrees }, {status: 200})
  } catch (error) {
    console.log(error)
    NextResponse.json({ error: 'Not found' }, {status: 404})
  }
}