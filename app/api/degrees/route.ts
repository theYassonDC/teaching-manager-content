import { prisma } from "@/libs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const degrees = await prisma.degree.findFirst()
    return NextResponse.json({ degrees }, {status: 200})
  } catch (error) {
    console.log(error)
    NextResponse.json({ error: 'Not found' }, {status: 404})
  }
}